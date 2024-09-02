import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardData: build.query({
      query: () => `/dashboard`,
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
