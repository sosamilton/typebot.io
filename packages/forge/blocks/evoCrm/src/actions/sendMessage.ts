import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";

export const sendMessage = createAction({
  auth,
  name: "Send Conversation Message",
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
        label: "Message",
        isRequired: true,
        inputType: "textarea",
        helperText: "Outgoing message sent to the contact.",
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
