import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { addLabels } from "../actions/addLabels";
import { createCrmClient } from "../helpers/createCrmClient";
import { addConversationLabels } from "../helpers/crmOperations";

export const addLabelsHandler = createActionHandler(addLabels, {
  server: async ({
    credentials: { baseUrl, apiToken },
    options: { conversationId, mode, labels, rawResultVariableId },
    variables,
    logs,
  }) => {
    if (!conversationId) return logs.add("conversationId is required");
    const cleanLabels =
      labels?.filter((label): label is string => !!label) ?? [];
    if (cleanLabels.length === 0)
      return logs.add("At least one label is required");
    try {
      const response = await addConversationLabels(
        createCrmClient({ baseUrl, apiToken }),
        conversationId,
        cleanLabels,
        mode === "set" ? "set" : "merge",
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
          context: "While adding Evo CRM conversation labels",
        }),
      );
    }
  },
});
