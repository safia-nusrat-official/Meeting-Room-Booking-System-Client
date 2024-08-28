import { ReactNode, useState } from "react";
import { TReduxResponse } from "./../../types/index";

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import loginAnimationData from "../../assets/animations/loginAnimation.json";
import LottieAnimation from "@/lib/LottieAnimation";
import { useLoginMutation } from "@/redux/api/auth.api";
import { TLoginData, TUser } from "@/types/user.types";
import { verifyToken } from "@/utility/authUtils/verifyToken";
import { Input, Form, Button } from "antd";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { Link } from "react-router-dom";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { control, reset, handleSubmit } = useForm({});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = (await login(data as TLoginData)) as TReduxResponse<any>;
      console.log(result);

      if (result?.error) {
        console.log(result?.message || result?.error?.message);
        toast.error(result?.error?.data?.message || result?.error?.message);
      } else {
        const token = result?.data?.data?.accessToken;
        const user = verifyToken(token) as TUser;
        dispatch(setUser({ user, token }));
        toast.success(`Logged in as ${user.name}.`);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="md:p-16 py-12 bg-white gap-0 md:gap-14 flex flex-col-reverse md:flex-row">
      <Card className="w-full border-0 border-r-[1px] max-w-md shadow-none rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            className="gap-4"
          >
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required.",
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label="Email"
                  className="mb-10"
                  validateStatus={error && "error"}
                  help={<p>{error?.message}</p>}
                >
                  <Input type="email" {...field} placeholder="m@example.com" />
                </Form.Item>
              )}
            ></Controller>

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required.",
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  help={<p>{error?.message}</p>}
                  label="Password"
                  validateStatus={error && "error"}
                >
                  <Input.Password
                    {...field}
                    placeholder="Enter Password"
                    type="password"
                  />
                </Form.Item>
              )}
            ></Controller>

            <Button
              className="w-full bg-slate-900 text-white mt-6 hover:text-slate-800 hover:bg-white"
              loading={isLoading}
              htmlType="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-slate-900 font-medium underline-offset-2 underline"
            >
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
      <div className="md:flex hidden justify-center items-center">
        <LottieAnimation
          animationData={loginAnimationData}
          width={400}
          height={400}
        />
      </div>
      <div className="flex md:hidden justify-center items-center">
        <LottieAnimation
          animationData={loginAnimationData}
          width={200}
          height={200}
        />
      </div>
    </section>
  );
}
