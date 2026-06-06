import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";
import { priorityValues } from "../constants";

export const handoffToHuman = createAction({
  auth,
  name: "Handoff Conversation to Human",
  options: option.object({
    conversationId: option.string.meta({
      layout: {
        label: "Conversation ID",
        isRequired: true,
        helperText: "Use {{evo_conversation_id}} when started from the CRM.",
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
          accordion: "Optional",
        },
      }),
    priority: option.enum(priorityValues).meta({
      layout: {
        label: "Priority",
        accordion: "Optional",
      },
    }),
    teamId: option.string.meta({
      layout: {
        label: "Team ID",
        accordion: "Optional",
        helperText: "Assign to a team to respect the routing algorithm.",
      },
    }),
    assigneeId: option.string.meta({
      layout: {
        label: "Assignee ID",
        accordion: "Optional",
        helperText: "Direct agent assignment. Skips the routing algorithm.",
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
