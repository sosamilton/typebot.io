import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";
import { statusValues } from "../constants";

export const setStatus = createAction({
  auth,
  name: "Set Conversation Status",
  options: option.object({
    conversationId: option.string.meta({
      layout: {
        label: "Conversation ID",
        isRequired: true,
        helperText: "Use {{evo_conversation_id}} when started from the CRM.",
      },
    }),
    status: option.enum(statusValues).meta({
      layout: {
        label: "Status",
        isRequired: true,
        defaultValue: "open",
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
