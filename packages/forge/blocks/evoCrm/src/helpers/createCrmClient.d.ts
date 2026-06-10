export declare const createCrmClient: ({
  baseUrl,
  apiToken,
}: {
  baseUrl?: string;
  apiToken?: string;
}) => {
  client: import("ky").KyInstance;
  apiBaseUrl: string;
  host: string;
};
//# sourceMappingURL=createCrmClient.d.ts.map
