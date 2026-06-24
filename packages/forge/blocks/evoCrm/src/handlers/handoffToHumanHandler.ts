import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { handoffToHuman } from "../actions/handoffToHuman";
import { createCrmClient } from "../helpers/createCrmClient";
import {
  addConversationLabels,
  assignConversation,
  setConversationPriority,
  setConversationStatus,
} from "../helpers/crmOperations";

export const handoffToHumanHandler = createActionHandler(handoffToHuman, {
  server: async ({
    credentials: { baseUrl, apiToken },
    options: {
      conversationId,
      labels,
      priority,
      teamId,
      assigneeId,
      rawResultVariableId,
    },
    variables,
    logs,
  }) => {
    if (!conversationId) return logs.add("conversationId is required");

    const crm = createCrmClient({ baseUrl, apiToken });
    const rawResults: unknown[] = [];
    const parseResponseJson = async (r: Response) => {
      const text = await r.text();
      return text ? JSON.parse(text) : null;
    };

    const cleanLabels =
      labels?.filter((label): label is string => !!label) ?? [];
    if (cleanLabels.length > 0) {
      try {
        const response = await addConversationLabels(
          crm,
          conversationId,
          cleanLabels,
          "merge",
        );
        rawResults.push(await parseResponseJson(response));
      } catch (error) {
        logs.add(
          await parseUnknownError({
            err: error,
            context: "Handoff: while adding labels (best-effort, skipped)",
          }),
        );
      }
    }

    if (priority) {
      try {
        const response = await setConversationPriority(
          crm,
          conversationId,
          priority,
        );
        rawResults.push(await parseResponseJson(response));
      } catch (error) {
        logs.add(
          await parseUnknownError({
            err: error,
            context: "Handoff: while setting priority (best-effort, skipped)",
          }),
        );
      }
    }

    if (assigneeId || teamId) {
      try {
        const response = await assignConversation(crm, conversationId, {
          assigneeId,
          teamId,
        });
        rawResults.push(await parseResponseJson(response));
      } catch (error) {
        logs.add(
          await parseUnknownError({
            err: error,
            context: "Handoff: while assigning (best-effort, skipped)",
          }),
        );
      }
    }

    try {
      const response = await setConversationStatus(crm, conversationId, "open");
      rawResults.push(await parseResponseJson(response));
    } catch (error) {
      logs.add(
        await parseUnknownError({
          err: error,
          context: "Handoff: while opening the conversation (critical step)",
        }),
      );
    }

    if (rawResultVariableId) {
      variables.set([
        { id: rawResultVariableId, value: JSON.stringify(rawResults) },
      ]);
    }
  },
});
