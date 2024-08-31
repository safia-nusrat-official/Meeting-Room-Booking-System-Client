import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import React, { FormEvent, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { useGetClientSecretQuery } from "@/redux/api/payment.api";
import { Button, Skeleton, Spin } from "antd";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/features/authSlice";
import { TUser } from "@/types/user.types";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const StripeCheckoutForm = ({
  totalAmount,
  isProcessing,
  setPaymentSuccess,
  setIsProcessing,
  handleConfirmBooking,
}: {
  totalAmount: number;
  handleConfirmBooking: any;
  isProcessing: boolean;
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useAppSelector(getUser) as TUser;
  const stripe = useStripe();
  const elements = useElements();
  const [key, setKey] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    // Block native form submission.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    // Use your card Element with other Stripe.js APIs
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}`,
      },
      redirect: "if_required",
    });
    if (error) {
      setIsProcessing(false);

      console.log("[error]", error);
      toast.error(error.message as string);
      setPaymentSuccess(false);
    } else if (paymentIntent.status === "succeeded") {
      setIsProcessing(false);
      console.log(paymentIntent);
      setKey((prev) => prev + 1);
      setPaymentSuccess(true);
      handleConfirmBooking();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        key={key}
        options={{
          defaultValues: {
            billingDetails: {
              email: user.email,
              name: user.name,
              address: {
                city: user.address,
              },
              phone: user.phone,
            },
          },
        }}
      />
      <Spin spinning={isProcessing} fullscreen></Spin>
      <Button
        className="rounded-sm mt-8 w-full bg-primaryColor"
        type="primary"
        htmlType="submit"
        loading={isProcessing}
        disabled={!stripe || !elements || isProcessing}
      >
        Pay $ {totalAmount.toFixed(2)}
      </Button>
    </form>
  );
};

const StripePayment = ({
  totalAmount,
  isProcessing,
  setPaymentSuccess,
  setIsProcessing,
  handleConfirmBooking,
}: {
  totalAmount: number;
  handleConfirmBooking: any;
  isProcessing: boolean;
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, isLoading } = useGetClientSecretQuery(totalAmount);
  const options = data && {
    clientSecret: data?.clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#32325d",
        colorBackground: "#ffffff",
      },
    },
  };

  return (
    <Card className="w-full rounded-sm shadow-none mt-4">
      <CardHeader>
        <CardTitle className="text-xl">Stripe Payment</CardTitle>
        <CardDescription>
          Enter your card details to complete the payment securely through
          Stripe.
        </CardDescription>
        <CardContent className="py-6 px-0">
          {data && stripePromise && (
            <Elements stripe={stripePromise} options={options}>
              <StripeCheckoutForm
                handleConfirmBooking={handleConfirmBooking}
                totalAmount={totalAmount}
                isProcessing={isProcessing}
                setPaymentSuccess={setPaymentSuccess}
                setIsProcessing={setIsProcessing}
              ></StripeCheckoutForm>
            </Elements>
          )}
          {isLoading && !data && (
            <Skeleton className="w-full" active></Skeleton>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default StripePayment;
