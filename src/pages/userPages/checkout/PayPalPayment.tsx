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
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { Skeleton } from "antd";
import { toast } from "sonner";

const PayPalPayment = ({
  totalAmount,
  setPaymentSuccess,
  setIsProcessing,
  handleConfirmBooking,
  bookingId,
}: {
  totalAmount: number;
  handleConfirmBooking: any;
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
  setPaymentSuccess,
  setIsProcessing,
  handleConfirmBooking,
  bookingId,
}: {
  totalAmount: number;
  handleConfirmBooking: any;
  bookingId: string;
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [createPayPalOrder] = useCreatePayPalOrderMutation();
  const [confirmPayPalOrder] =
    useConfirmPayPalPaymentMutation();

  const createOrder = async (data: any) => {
    console.log(data)
    try {
      const res = await createPayPalOrder({
        totalAmount,
        bookingId,
        paymentMethod: "paypal",
      }).unwrap();

      const id = res.data?.id; // paypalOrderId
      return id;
    } catch (error) {
      console.log(error);
      toast.error("Failed to pay through PayPal!");
    }
  };

  // what happens when user approves the payment and transaction is finalized
  const onApprove = async (paypalOrder: any) => {
    setIsProcessing(true)
    try {
      const transaction = await confirmPayPalOrder(paypalOrder.orderID).unwrap();

      setIsProcessing(false)
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
