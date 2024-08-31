import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClientSecret: build.query({
      query: (totalAmount: number) => {
        return {
          url: `/create-payment-intent`,
          method:"POST",
          body: { totalAmount: totalAmount.toFixed(2) },
        };
      },
    }),
  }),
});

export const {useGetClientSecretQuery} = paymentApi;
