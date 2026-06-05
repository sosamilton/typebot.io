import { createAuth, option } from "@typebot.io/forge";
import { defaultBaseUrl } from "./constants";

export const auth = createAuth({
  type: "encryptedCredentials",
  name: "Evo CRM account",
  schema: option.object({
    baseUrl: option.string
      .meta({
        layout: {
          label: "Base URL",
          isRequired: true,
          helperText: "Change it only if you are self-hosting Evo CRM.",
          withVariableButton: false,
          defaultValue: defaultBaseUrl,
        },
      })
      .transform((value) => value?.replace(/\/$/, "")),
    apiToken: option.string.meta({
      layout: {
        label: "API Token",
        isRequired: true,
        inputType: "password",
        helperText: "Profile settings → Access Token in your Evo CRM account.",
        withVariableButton: false,
      },
    }),
  }),
});
