import { apiClient } from "../../client";
import type { PageViewPayload, PageViewData } from "./types";
import type { ApiResponse } from "../../types";

export const stampApi = {
  pageView: (payload: PageViewPayload): Promise<ApiResponse<PageViewData>> =>
    apiClient.post<PageViewData>("/stamp/page-view", payload),
};
