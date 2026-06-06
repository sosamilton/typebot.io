import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";

export const sendPrivateNote = createAction({
  auth,
  name: "Send Conversation Private Note",
  options: option.object({
    conversationId: option.string.meta({
      layout: {
        label: "Conversation ID",
        isRequired: true,
        helperText: "Use {{evo_conversation_id}} when started from the CRM.",
      },
    }),
    content: option.string.meta({
      layout: {
        label: "Note",
        isRequired: true,
        inputType: "textarea",
        helperText: "Internal note visible only to agents, not to the contact.",
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
