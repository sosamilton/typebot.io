import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { isNotDefined } from "@typebot.io/lib/utils";
import { searchContact } from "../actions/searchContact";
import { createCrmClient } from "../helpers/createCrmClient";

type SearchContactResponse = {
  // The CRM can return either an array in `data`, a `payload` array, or `data.payload`.
  data?: Array<Record<string, any>> | { payload?: Array<Record<string, any>> };
  payload?: Array<Record<string, any>>;
};

export const searchContactHandler = createActionHandler(searchContact, {
  server: async ({
    credentials: { baseUrl, apiToken },
    options: { query, returnType, responseMapping, rawResultVariableId },
    variables,
    logs,
  }) => {
    if (!query) return logs.add("query is required");
    try {
      const { client, apiBaseUrl } = createCrmClient({ baseUrl, apiToken });
      const response = await client
        .get(`${apiBaseUrl}/contacts/search`, {
          searchParams: { q: query },
        })
        .json<SearchContactResponse>();

      const raw = response.data ?? response.payload ?? [];
      const contacts = Array.isArray(raw) ? raw : (raw?.payload ?? []);
      if (rawResultVariableId) {
        variables.set([
          { id: rawResultVariableId, value: JSON.stringify(contacts) },
        ]);
      }

      if (contacts.length === 0)
        return logs.add({
          status: "info",
          description: "No contact found",
        });

      const selectedContacts = returnType === "All" ? contacts : [contacts[0]];

      responseMapping?.forEach((mapping) => {
        const fieldName = mapping.fieldName;
        const variableId = mapping.variableId;
        if (!fieldName || !variableId) return;
        const values = selectedContacts.map((contact) => contact?.[fieldName]);
        if (values.every(isNotDefined)) {
          logs.add(`Field ${fieldName} not found in contact`);
          return;
        }
        variables.set([
          {
            id: variableId,
            value: values.length === 1 ? values[0] : values,
          },
        ]);
      });
    } catch (error) {
      logs.add(
        await parseUnknownError({
          err: error,
          context: "While searching Evo CRM contact",
        }),
      );
    }
  },
});
