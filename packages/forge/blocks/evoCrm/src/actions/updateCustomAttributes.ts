import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";

export const updateCustomAttributes = createAction({
  auth,
  name: "Update Conversation Custom Attributes",
  options: option.object({
    conversationId: option.string.meta({
      layout: {
        label: "Conversation ID",
        isRequired: true,
        helperText: "Use {{evo_conversation_id}} when started from the CRM.",
      },
    }),
    attributes: option
      .array(
        option.object({
          key: option.string.meta({
            layout: {
              label: "Key",
              isRequired: true,
            },
          }),
          value: option.string.meta({
            layout: {
              label: "Value",
              isRequired: true,
            },
          }),
        }),
      )
      .meta({
        layout: {
          itemLabel: "attribute",
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
