import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { sendMessage } from "../actions/sendMessage";
import { createCrmClient } from "../helpers/createCrmClient";

export const sendMessageHandler = createActionHandler(sendMessage, {
  server: async ({
    credentials: { baseUrl, apiToken },
    options: { conversationId, content, rawResultVariableId },
    variables,
    logs,
  }) => {
    if (!conversationId) return logs.add("conversationId is required");
    if (!content) return logs.add("content is required");
    try {
      const { client, apiBaseUrl } = createCrmClient({ baseUrl, apiToken });
      const response = await client.post(
        `${apiBaseUrl}/conversations/${conversationId}/messages`,
        {
          json: {
            content,
            message_type: "outgoing",
            private: false,
            content_type: "text",
          },
        },
      );
      const body = await response.json();
      if (rawResultVariableId) {
        variables.set([
          { id: rawResultVariableId, value: JSON.stringify(body) },
        ]);
      }
    } catch (error) {
      logs.add(
        await parseUnknownError({
          err: error,
          context: "While sending Evo CRM message",
        }),
      );
    }
  },
});
