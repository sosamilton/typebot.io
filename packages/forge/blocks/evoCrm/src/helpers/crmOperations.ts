import type { createCrmClient } from "./createCrmClient";

type CrmClient = ReturnType<typeof createCrmClient>;

type LabelsResponse = {
  payload?: string[];
  data?: { payload?: string[] };
};

export const setConversationStatus = (
  { client, apiBaseUrl }: CrmClient,
  conversationId: string,
  status: string,
) =>
  client.post(`${apiBaseUrl}/conversations/${conversationId}/toggle_status`, {
    json: { status },
  });

export const setConversationPriority = (
  { client, apiBaseUrl }: CrmClient,
  conversationId: string,
  priority: string,
) =>
  client.post(`${apiBaseUrl}/conversations/${conversationId}/toggle_priority`, {
    json: { priority },
  });

export const assignConversation = (
  { client, apiBaseUrl }: CrmClient,
  conversationId: string,
  assignment: { assigneeId?: string; teamId?: string },
) => {
  const json = assignment.assigneeId
    ? { assignee_id: assignment.assigneeId }
    : { team_id: assignment.teamId };
  return client.post(
    `${apiBaseUrl}/conversations/${conversationId}/assignments`,
    { json },
  );
};

export const addConversationLabels = async (
  crm: CrmClient,
  conversationId: string,
  labels: string[],
  mode: "merge" | "set",
) => {
  const { client, apiBaseUrl } = crm;
  let finalLabels = labels;

  if (mode === "merge") {
    const existing = await client
      .get(`${apiBaseUrl}/conversations/${conversationId}/labels`)
      .json<LabelsResponse>();
    const current = existing.data?.payload ?? existing.payload ?? [];
    finalLabels = Array.from(new Set([...current, ...labels]));
  }

  return client.post(`${apiBaseUrl}/conversations/${conversationId}/labels`, {
    json: { labels: finalLabels },
  });
};
