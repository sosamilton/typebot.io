import { ky } from "@typebot.io/lib/ky";
import { defaultBaseUrl } from "../constants";

export const createCrmClient = ({
  baseUrl,
  apiToken,
}: {
  baseUrl?: string;
  apiToken?: string;
}) => {
  const normalizedBaseUrl = (baseUrl ?? defaultBaseUrl).replace(/\/$/, "");

  let host = normalizedBaseUrl;
  try {
    host = new URL(normalizedBaseUrl).origin;
  } catch {
    host = normalizedBaseUrl;
  }

  const client = ky.extend({
    headers: {
      api_access_token: apiToken ?? "",
    },
  });

  return {
    client,
    apiBaseUrl: `${normalizedBaseUrl}/api/v1`,
    host,
  };
};
