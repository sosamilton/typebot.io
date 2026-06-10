import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { updateContact } from "../actions/updateContact";
import { createCrmClient } from "../helpers/createCrmClient";
import { parseKeyValueRecord } from "../helpers/parseKeyValueRecord";

const standardFields = ["name", "email", "phone_number", "identifier"];

export const updateContactHandler = createActionHandler(updateContact, {
  server: async ({
    credentials: { baseUrl, apiToken },
    options: { contactId, fields, rawResultVariableId },
    variables,
    logs,
  }) => {
    if (!contactId) return logs.add("contactId is required");
    const record = parseKeyValueRecord(fields);
    if (Object.keys(record).length === 0)
      return logs.add("At least one field is required");

    const body: Record<string, unknown> = {};
    const customAttributes: Record<string, string> = {};
    Object.entries(record).forEach(([key, value]) => {
      if (standardFields.includes(key)) body[key] = value;
      else customAttributes[key] = value;
    });
    if (Object.keys(customAttributes).length > 0)
      body.custom_attributes = customAttributes;

    try {
      const { client, apiBaseUrl } = createCrmClient({ baseUrl, apiToken });
      const response = await client.put(`${apiBaseUrl}/contacts/${contactId}`, { json: body });
      const responseBody = await response.json();
      if (rawResultVariableId) {
        variables.set([
          { id: rawResultVariableId, value: JSON.stringify(responseBody) },
        ]);
      }
    } catch (error) {
      logs.add(
        await parseUnknownError({
          err: error,
          context: "While updating Evo CRM contact",
        }),
      );
    }
  },
});
