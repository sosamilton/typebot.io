import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { setStatus } from "../actions/setStatus";
import { createCrmClient } from "../helpers/createCrmClient";
import { setConversationStatus } from "../helpers/crmOperations";

export const setStatusHandler = createActionHandler(setStatus, {
  server: async ({
    credentials: { baseUrl, apiToken },
    options: { conversationId, status, rawResultVariableId },
    variables,
    logs,
  }) => {
    if (!conversationId) return logs.add("conversationId is required");
    if (!status) return logs.add("status is required");
    try {
      const response = await setConversationStatus(
        createCrmClient({ baseUrl, apiToken }),
        conversationId,
        status,
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
          context: "While setting Evo CRM conversation status",
        }),
      );
    }
  },
});
