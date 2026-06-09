import { createAction, option } from "@typebot.io/forge";
import { isDefined } from "@typebot.io/lib/utils";
import { auth } from "../auth";
import { searchReturnTypes } from "../constants";

export const searchContact = createAction({
  auth,
  name: "Search Contact",
  options: option.object({
    query: option.string.meta({
      layout: {
        label: "Query",
        isRequired: true,
        helperText: "Search by name, email, phone number or identifier.",
      },
    }),
    returnType: option.enum(searchReturnTypes).meta({
      layout: {
        label: "Return",
        defaultValue: "First",
      },
    }),
    responseMapping: option
      .array(
        option.object({
          fieldName: option.string.meta({
            layout: {
              label: "Field",
              moreInfoTooltip:
                "Contact field to read, e.g. id, name, email, phone_number.",
            },
          }),
          variableId: option.string.meta({
            layout: {
              inputType: "variableDropdown",
            },
          }),
        }),
      )
      .meta({
        layout: {
          accordion: "Response Mapping",
        },
      }),
    rawResultVariableId: option.string.meta({
      layout: {
        inputType: "variableDropdown",
        label: "Debug: raw result",
      },
    }),
  }),
  getSetVariableIds: ({ responseMapping, rawResultVariableId }) =>
    [
      ...responseMapping?.map((r) => r.variableId).filter(isDefined) ?? [],
      rawResultVariableId,
    ].filter(isDefined),
});
