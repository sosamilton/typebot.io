import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";

export const addLabels = createAction({
  auth,
  name: "Add Conversation Labels",
  options: option.object({
    conversationId: option.string.meta({
      layout: {
        label: "Conversation ID",
        isRequired: true,
        helperText: "Use {{evo_conversation_id}} when started from the CRM.",
      },
    }),
    mode: option.enum(["merge", "set"]).meta({
      layout: {
        label: "Mode",
        defaultValue: "merge",
        helperText:
          "merge keeps existing labels and adds new ones; set replaces all labels.",
      },
    }),
    labels: option
      .array(
        option.string.meta({
          layout: {
            label: "Label",
            isRequired: true,
          },
        }),
      )
      .meta({
        layout: {
          itemLabel: "label",
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
