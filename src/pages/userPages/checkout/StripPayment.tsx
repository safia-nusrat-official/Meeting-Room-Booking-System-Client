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
import { Button } from "@/components/ui/button";
import { Skeleton } from "antd";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const StripeCheckoutForm = ({ totalAmount }: { totalAmount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    // Block native form submission.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "",
      },
    });

    if (error) {
      console.log("[error]", error);
    } else {
      toast.success("Payment successful!")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button className="rounded-sm mt-8 w-full" type="submit" disabled={!stripe}>
        Pay $ {totalAmount.toFixed(2)}
      </Button>
    </form>
  );
};

const StripePayment = ({ totalAmount }: { totalAmount: number }) => {
  const { data, isLoading } = useGetClientSecretQuery(totalAmount);
  console.log(data);

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
                totalAmount={totalAmount}
              ></StripeCheckoutForm>
            </Elements>
          )}
          {isLoading && !data && <Skeleton className="w-full" active></Skeleton>}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default StripePayment;
