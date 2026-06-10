import type { createCrmClient } from "./createCrmClient";
type CrmClient = ReturnType<typeof createCrmClient>;
export declare const setConversationStatus: (
  { client, apiBaseUrl }: CrmClient,
  conversationId: string,
  status: string,
) => import("ky").ResponsePromise;
export declare const setConversationPriority: (
  { client, apiBaseUrl }: CrmClient,
  conversationId: string,
  priority: string,
) => import("ky").ResponsePromise;
export declare const assignConversation: (
  { client, apiBaseUrl }: CrmClient,
  conversationId: string,
  assignment: {
    assigneeId?: string;
    teamId?: string;
  },
) => import("ky").ResponsePromise;
export declare const addConversationLabels: (
  crm: CrmClient,
  conversationId: string,
  labels: string[],
  mode: "merge" | "set",
) => Promise<import("ky").KyResponse>;
//# sourceMappingURL=crmOperations.d.ts.map
