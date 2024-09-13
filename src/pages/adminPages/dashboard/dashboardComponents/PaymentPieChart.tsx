import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import { Skeleton } from "antd";

export const PayemntPieChart = (data: any) => {
  const chartData =
    data &&
    data?.data?.paymentMethod?.length > 0 &&
    data?.data?.paymentMethod.map((item: any) => ({
      paymentMethod: item._id,
      count: item.count,
      fill: item._id === "stripe" ? "#ae6ae6" : "#1c3bb8",
    }));
  const totalPayments = data && data?.data?.totalPayments;

  const percentages =
    chartData?.length > 0 &&
    chartData.map((payment: any) => ({
      paymentMethod: payment.paymentMethod,
      percentage: ((payment.count / totalPayments) * 100).toFixed(1),
    }));

  return data ? (
    <Card className="flex col-span-3 shadow-none rounded-sm flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Payment Method - Most Used</CardTitle>
        <CardDescription>
          {moment().month(-6).format("MMMM")} -{" "}
          {moment(new Date()).format("MMMM YYYY")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="paymentMethod"
              innerRadius={60}
              strokeWidth={2}
              outerRadius={70}
              fontWeight={600}
              label={({ count }) => {
                const percentage = ((count / totalPayments) * 100).toFixed(1);
                return `${percentage}%`;
              }}
              labelLine={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPayments}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Payments
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="paymentMethod" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-4 text-sm">
        <div className="flex items-center gap-2 font-medium">
          {percentages[0]?.percentage > percentages[1]?.percentage
            ? "Stripe "
            : "Paypal "}
          trending up by{" "}
          {percentages[0]?.percentage > percentages[1]?.percentage
            ? (percentages[0]?.percentage - percentages[1]?.percentage).toFixed(1)
            : (percentages[1]?.percentage - percentages[0]?.percentage).toFixed(
                1
              )}
          % this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total payments for the last 6 months
        </div>
      </CardFooter>
    </Card>
  ) : (
    <Skeleton paragraph avatar></Skeleton>
  );
};

// data for chart

const chartConfig = {
  stripe: {
    label: "Stripe",
  },
  paypal: {
    label: "PayPal",
  },
} satisfies ChartConfig;
