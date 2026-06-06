import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";
import { priorityValues } from "../constants";

export const setPriority = createAction({
  auth,
  name: "Set Conversation Priority",
  options: option.object({
    conversationId: option.string.meta({
      layout: {
        label: "Conversation ID",
        isRequired: true,
        helperText: "Use {{evo_conversation_id}} when started from the CRM.",
      },
    }),
    priority: option.enum(priorityValues).meta({
      layout: {
        label: "Priority",
        isRequired: true,
        defaultValue: "none",
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
