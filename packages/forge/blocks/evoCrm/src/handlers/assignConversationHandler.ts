import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { assignConversation } from "../actions/assignConversation";
import { createCrmClient } from "../helpers/createCrmClient";
import { assignConversation as assignConversationOp } from "../helpers/crmOperations";

export const assignConversationHandler = createActionHandler(
  assignConversation,
  {
    server: async ({
      credentials: { baseUrl, apiToken },
      options: { conversationId, assigneeId, teamId, rawResultVariableId },
      variables,
      logs,
    }) => {
      if (!conversationId) return logs.add("conversationId is required");
      if (!assigneeId && !teamId)
        return logs.add("Either assigneeId or teamId is required");
      try {
        const response = await assignConversationOp(
          createCrmClient({ baseUrl, apiToken }),
          conversationId,
          { assigneeId, teamId },
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
            context: "While assigning Evo CRM conversation",
          }),
        );
      }
    },
  },
);
