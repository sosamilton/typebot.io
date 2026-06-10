import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { updateCustomAttributes } from "../actions/updateCustomAttributes";
import { createCrmClient } from "../helpers/createCrmClient";
import { parseKeyValueRecord } from "../helpers/parseKeyValueRecord";

export const updateCustomAttributesHandler = createActionHandler(
  updateCustomAttributes,
  {
    server: async ({
      credentials: { baseUrl, apiToken },
      options: { conversationId, attributes, rawResultVariableId },
      variables,
      logs,
    }) => {
      if (!conversationId) return logs.add("conversationId is required");
      const customAttributes = parseKeyValueRecord(attributes);
      if (Object.keys(customAttributes).length === 0)
        return logs.add("At least one attribute is required");
      try {
        const { client, apiBaseUrl } = createCrmClient({ baseUrl, apiToken });
        const response = await client.post(
          `${apiBaseUrl}/conversations/${conversationId}/custom_attributes`,
          { json: { custom_attributes: customAttributes } },
        );
        const body = await response.json();
        if (rawResultVariableId) {
          variables.set([
            { id: rawResultVariableId, value: JSON.stringify(body) },
          ]);
        }
      } catch (error) {
        logs.add(
          await parseUnknownError({
            err: error,
            context: "While updating Evo CRM conversation custom attributes",
          }),
        );
      }
    },
  },
);
