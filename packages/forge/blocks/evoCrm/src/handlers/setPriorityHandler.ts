import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { setPriority } from "../actions/setPriority";
import { createCrmClient } from "../helpers/createCrmClient";
import { setConversationPriority } from "../helpers/crmOperations";

export const setPriorityHandler = createActionHandler(setPriority, {
  server: async ({
    credentials: { baseUrl, apiToken },
    options: { conversationId, priority, rawResultVariableId },
    variables,
    logs,
  }) => {
    if (!conversationId) return logs.add("conversationId is required");
    if (!priority) return logs.add("priority is required");
    try {
      const response = await setConversationPriority(
        createCrmClient({ baseUrl, apiToken }),
        conversationId,
        priority,
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
          context: "While setting Evo CRM conversation priority",
        }),
      );
    }
  },
});
