export declare const addLabelsHandler: {
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
            mode?: "set" | "merge" | undefined;
            labels?: (string | undefined)[] | undefined;
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
              mode?: "set" | "merge" | undefined;
              labels?: (string | undefined)[] | undefined;
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
                    mode?: "set" | "merge" | undefined;
                    labels?: (string | undefined)[] | undefined;
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
                          mode?: "set" | "merge" | undefined;
                          labels?: (string | undefined)[] | undefined;
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
                    mode?: "set" | "merge" | undefined;
                    labels?: (string | undefined)[] | undefined;
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
                  mode?: "set" | "merge" | undefined;
                  labels?: (string | undefined)[] | undefined;
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
//# sourceMappingURL=addLabelsHandler.d.ts.map
