export declare const handoffToHumanHandler: {
  type: "action";
  actionName: string;
  server?:
    | ((params: {
        credentials: {
          baseUrl: string | undefined;
          apiToken?: string | undefined;
        };
        options: import("@typebot.io/variables/types").WithoutVariables<
          Record<string, never> & {
            conversationId?: string | undefined;
            labels?: (string | undefined)[] | undefined;
            priority?:
              | "urgent"
              | "high"
              | "medium"
              | "low"
              | "none"
              | undefined;
            teamId?: string | undefined;
            assigneeId?: string | undefined;
          }
        >;
        variables: import("@typebot.io/forge/types").VariableStore;
        logs: import("@typebot.io/forge/types").LogsStore;
        sessionStore: import("@typebot.io/runtime-session-store").SessionStore;
      }) => Promise<void> | void)
    | undefined;
  stream?:
    | {
        run: (params: {
          credentials: {
            baseUrl: string | undefined;
            apiToken?: string | undefined;
          };
          options: import("@typebot.io/variables/types").WithoutVariables<
            Record<string, never> & {
              conversationId?: string | undefined;
              labels?: (string | undefined)[] | undefined;
              priority?:
                | "urgent"
                | "high"
                | "medium"
                | "low"
                | "none"
                | undefined;
              teamId?: string | undefined;
              assigneeId?: string | undefined;
            }
          >;
          variables: import("@typebot.io/forge/types").AsyncVariableStore;
          sessionStore: import("@typebot.io/runtime-session-store").SessionStore;
        }) => Promise<{
          stream?: ReadableStream<any>;
          error?: {
            description: string;
            details?: string;
            context?: string;
          };
        }>;
      }
    | undefined;
  web?:
    | {
        displayEmbedBubble?:
          | {
              parseUrl: (params: {
                credentials: {
                  baseUrl: string | undefined;
                  apiToken?: string | undefined;
                };
                options: import("@typebot.io/variables/types").WithoutVariables<
                  Record<string, never> & {
                    conversationId?: string | undefined;
                    labels?: (string | undefined)[] | undefined;
                    priority?:
                      | "urgent"
                      | "high"
                      | "medium"
                      | "low"
                      | "none"
                      | undefined;
                    teamId?: string | undefined;
                    assigneeId?: string | undefined;
                  }
                >;
                variables: import("@typebot.io/forge/types").VariableStore;
                logs: import("@typebot.io/forge/types").LogsStore;
              }) => string | undefined;
              waitForEvent?:
                | {
                    parseFunction: (params: {
                      credentials: {
                        baseUrl: string | undefined;
                        apiToken?: string | undefined;
                      };
                      options: import("@typebot.io/variables/types").WithoutVariables<
                        Record<string, never> & {
                          conversationId?: string | undefined;
                          labels?: (string | undefined)[] | undefined;
                          priority?:
                            | "urgent"
                            | "high"
                            | "medium"
                            | "low"
                            | "none"
                            | undefined;
                          teamId?: string | undefined;
                          assigneeId?: string | undefined;
                        }
                      >;
                      variables: import("@typebot.io/forge/types").VariableStore;
                      logs: import("@typebot.io/forge/types").LogsStore;
                    }) => import("@typebot.io/forge/types").FunctionToExecute;
                  }
                | undefined;
              parseInitFunction: (params: {
                credentials: {
                  baseUrl: string | undefined;
                  apiToken?: string | undefined;
                };
                options: import("@typebot.io/variables/types").WithoutVariables<
                  Record<string, never> & {
                    conversationId?: string | undefined;
                    labels?: (string | undefined)[] | undefined;
                    priority?:
                      | "urgent"
                      | "high"
                      | "medium"
                      | "low"
                      | "none"
                      | undefined;
                    teamId?: string | undefined;
                    assigneeId?: string | undefined;
                  }
                >;
                variables: import("@typebot.io/forge/types").VariableStore;
                logs: import("@typebot.io/forge/types").LogsStore;
              }) => import("@typebot.io/forge/types").FunctionToExecute;
            }
          | undefined;
        parseFunction?:
          | ((params: {
              credentials: {
                baseUrl: string | undefined;
                apiToken?: string | undefined;
              };
              options: import("@typebot.io/variables/types").WithoutVariables<
                Record<string, never> & {
                  conversationId?: string | undefined;
                  labels?: (string | undefined)[] | undefined;
                  priority?:
                    | "urgent"
                    | "high"
                    | "medium"
                    | "low"
                    | "none"
                    | undefined;
                  teamId?: string | undefined;
                  assigneeId?: string | undefined;
                }
              >;
              variables: import("@typebot.io/forge/types").VariableStore;
              logs: import("@typebot.io/forge/types").LogsStore;
            }) =>
              | import("@typebot.io/forge/types").FunctionToExecute
              | undefined)
          | undefined;
      }
    | undefined;
};
//# sourceMappingURL=handoffToHumanHandler.d.ts.map
