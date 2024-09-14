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

import { useGetStripeClientSecretQuery } from "@/redux/api/payment.api";
import { Button, Skeleton, Spin } from "antd";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/features/authSlice";
import { TUser } from "@/types/user.types";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const StripeCheckoutForm = ({
  totalAmount,
  isProcessing,
  setIsProcessing,
  handleConfirmBooking,
}: {
  totalAmount: number;
  handleConfirmBooking: any;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useAppSelector(getUser) as TUser;
  const stripe = useStripe();
  const elements = useElements();
  const [key, setKey] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}`,
        receipt_email:user.email,
      },
      redirect:"if_required"
    });
    
    if (result.error) {
      setIsProcessing(false);
      toast.error(result.error.message as string);
    } else if (result.paymentIntent?.status === "succeeded") {
      setIsProcessing(false);
      setKey((prev) => prev + 1);
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
  setIsProcessing,
  handleConfirmBooking,
}: {
  totalAmount: number;
  handleConfirmBooking: any;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, isLoading } = useGetStripeClientSecretQuery(totalAmount);
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
                setIsProcessing={setIsProcessing}
              ></StripeCheckoutForm>
            </Elements>
          )}
          {isLoading && (
            <Skeleton className="w-full" active></Skeleton>
          )}
          {
             !data && (
              <Skeleton className="w-full" active></Skeleton>
            )
          }
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default StripePayment;
