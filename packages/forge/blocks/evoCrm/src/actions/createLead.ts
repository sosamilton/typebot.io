import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";

export const createLead = createAction({
  auth,
  name: "Create Lead",
  options: option.object({
    contactFields: option
      .array(
        option.object({
          key: option.string.meta({
            layout: {
              label: "Field",
              isRequired: true,
              moreInfoTooltip: "Contact field, e.g. name, email, phone_number.",
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
          itemLabel: "contact field",
          accordion: "Contact",
        },
      }),
    customFields: option
      .array(
        option.object({
          key: option.string.meta({
            layout: {
              label: "Field",
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
          itemLabel: "custom field",
          accordion: "Custom Fields",
        },
      }),
    metadata: option
      .array(
        option.object({
          key: option.string.meta({
            layout: {
              label: "Field",
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
          itemLabel: "metadata",
          accordion: "Metadata",
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
