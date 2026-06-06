import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";

export const assignConversation = createAction({
  auth,
  name: "Assign Conversation",
  options: option.object({
    conversationId: option.string.meta({
      layout: {
        label: "Conversation ID",
        isRequired: true,
        helperText: "Use {{evo_conversation_id}} when started from the CRM.",
      },
    }),
    assigneeId: option.string.meta({
      layout: {
        label: "Assignee ID",
        helperText:
          "Direct agent assignment. Skips the routing algorithm. If set, Team ID is ignored.",
      },
    }),
    teamId: option.string.meta({
      layout: {
        label: "Team ID",
        helperText:
          "Assign to a team and let the routing algorithm pick the agent.",
      },
    }),
    rawResultVariableId: option.string.meta({
      layout: {
        inputType: "variableDropdown",
        label: "Debug: raw result",
      },
    }),
  }),
  getSetVariableIds: ({ rawResultVariableId }) =>
    rawResultVariableId ? [rawResultVariableId] : [],
});
