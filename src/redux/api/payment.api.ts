import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStripeClientSecret: build.query({
      query: (totalAmount: number) => {
        return {
          url: `/payments/create-payment-intent`,
          method: "POST",
          body: { totalAmount: totalAmount.toFixed(2) },
        };
      },
    }),

    createPayPalOrder: build.mutation({
      query: ({
        totalAmount,
        bookingId,
        paymentMethod,
      }: {
        totalAmount: number;
        bookingId: string;
        paymentMethod: "paypal";
      }) => {
        return {
          url: `/payments/create-paypal-order`,
          method: "POST",
          body: {
            totalAmount,
            bookingId,
            paymentMethod,
          },
        };
      },
    }),

    confirmPayPalPayment: build.mutation({
      query: (PayPalOrderId: any) => {
        console.log("Order id recieved in rtk mutation", PayPalOrderId);
        return {
          url: `/payments/capture-paypal-order`,
          method: "POST",
          body: { PayPalOrderId },
        };
      },
    }),
  }),
});

export const {
  useCreatePayPalOrderMutation,
  useGetStripeClientSecretQuery,
  useConfirmPayPalPaymentMutation,
} = paymentApi;
