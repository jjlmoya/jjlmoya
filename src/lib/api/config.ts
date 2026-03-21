const BASE_URL =
  typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_API_URL
    ? import.meta.env.PUBLIC_API_URL
    : "https://api.jjlmoya.es";

export const API_CONFIG = {
  baseUrl: BASE_URL,
  version: "v1",
} as const;

export function getApiUrl(path: string): string {
  return `${API_CONFIG.baseUrl}/api/${API_CONFIG.version}${path}`;
}
