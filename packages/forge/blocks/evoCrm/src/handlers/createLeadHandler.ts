import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { createLead } from "../actions/createLead";
import { createCrmClient } from "../helpers/createCrmClient";
import { parseKeyValueRecord } from "../helpers/parseKeyValueRecord";

export const createLeadHandler = createActionHandler(createLead, {
  server: async ({
    credentials: { baseUrl, apiToken },
    options: { contactFields, customFields, metadata, rawResultVariableId },
    variables,
    logs,
  }) => {
    const contact = parseKeyValueRecord(contactFields);
    const customFieldsRecord = parseKeyValueRecord(customFields);
    const metadataRecord = parseKeyValueRecord(metadata);

    const body: Record<string, unknown> = {};
    if (Object.keys(contact).length > 0) body.contact = contact;
    if (Object.keys(customFieldsRecord).length > 0)
      body.custom_fields = customFieldsRecord;
    if (Object.keys(metadataRecord).length > 0) body.metadata = metadataRecord;

    if (Object.keys(body).length === 0)
      return logs.add(
        "At least one contact, custom or metadata field is required",
      );

    try {
      const { client, host } = createCrmClient({ baseUrl, apiToken });
      const response = await client.post(`${host}/public/api/v1/leads`, {
        json: body,
      });
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
          context: "While creating Evo CRM lead",
        }),
      );
    }
  },
});
