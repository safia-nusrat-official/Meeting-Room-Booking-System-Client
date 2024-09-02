import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useConfirmPayPalPaymentMutation,
  useCreatePayPalOrderMutation,
} from "@/redux/api/payment.api";
import { TReduxResponse } from "@/types";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { Skeleton } from "antd";
import { toast } from "sonner";

const PayPalPayment = ({
  totalAmount,
  isProcessing,
  setPaymentSuccess,
  setIsProcessing,
  handleConfirmBooking,
  bookingId,
}: {
  totalAmount: number;
  handleConfirmBooking: any;
  isProcessing: boolean;
  bookingId: string;
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  const initialOptions = {
    clientId,
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Card className="w-full rounded-sm shadow-none mt-4">
        <CardHeader>
          <CardTitle className="text-xl">PayPal Payment</CardTitle>
          <CardDescription>
            Enter your card details to complete the payment securely through
            Stripe.
          </CardDescription>
          <CardContent className="py-6 px-0">
            <PayPalButtonsWrapper
              bookingId={bookingId}
              totalAmount={totalAmount}
              handleConfirmBooking={handleConfirmBooking}
              isProcessing={isProcessing}
              setPaymentSuccess={setPaymentSuccess}
              setIsProcessing={setIsProcessing}
            ></PayPalButtonsWrapper>
          </CardContent>
        </CardHeader>
      </Card>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;

const PayPalButtonsWrapper = ({
  totalAmount,
  isProcessing,
  setPaymentSuccess,
  setIsProcessing,
  handleConfirmBooking,
  bookingId,
}: {
  totalAmount: number;
  handleConfirmBooking: any;
  isProcessing: boolean;
  bookingId: string;
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [createPayPalOrder] = useCreatePayPalOrderMutation();
  const [confirmPayPalOrder, { isLoading: paymentConfirmationLoading }] =
    useConfirmPayPalPaymentMutation();

  const createOrder = async (data: any) => {
    try {
      const res = await createPayPalOrder({
        totalAmount,
        bookingId,
        paymentMethod: "paypal",
      }).unwrap();

      console.log(res);
      const id = res.data?.id; // paypalOrderId

      console.log("What paypalOrderId createOrder() generated", id);
      return id;
    } catch (error) {
      console.log(error);
      toast.error("Failed to pay through PayPal!");
    }
  };

  // what happens when user approves the payment and transaction is finalized
  const onApprove = async (paypalOrder: any) => {
    console.log("What on approved recieved from create order", paypalOrder)
    try {
      const transaction = await confirmPayPalOrder(paypalOrder.orderID).unwrap();
      console.log(transaction);

      if(transaction?.data?.status==="COMPLETED"||transaction.statusCode===201){
        toast.success("Payment Through PayPal Successful")
        setPaymentSuccess(true)
        handleConfirmBooking()
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to pay through PayPal!");
    }
  };

  return (
    <>
      {isPending && <Skeleton className="w-full" active></Skeleton>}

      <PayPalButtons
        style={{ layout: "vertical", label: "pay" }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
};
