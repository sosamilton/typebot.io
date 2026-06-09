import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";

export const updateContact = createAction({
  auth,
  name: "Update Contact",
  options: option.object({
    contactId: option.string.meta({
      layout: {
        label: "Contact ID",
        isRequired: true,
        helperText: "Use {{evo_contact_id}} when started from the CRM.",
      },
    }),
    fields: option
      .array(
        option.object({
          key: option.string.meta({
            layout: {
              label: "Field",
              isRequired: true,
              moreInfoTooltip:
                "e.g. name, email, phone_number or a custom attribute key.",
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
          itemLabel: "field",
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
