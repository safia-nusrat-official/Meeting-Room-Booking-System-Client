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
import { useSignupMutation } from "@/redux/api/auth.api";
import { TUser } from "@/types/user.types";
import { verifyToken } from "@/utility/authUtils/verifyToken";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { logout, setUser } from "@/redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "@/components/shared/form/CustomForm";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "antd";
import FormInputWatch from "@/components/shared/form/FormInputWatch";

export default function Signup() {
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData: TUser = {
      address: data.address,
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      role: "user",
    };
    try {
      const result = (await signup(userData)) as TReduxResponse<any>;
      console.log(result);

      if (result?.error) {
        console.log(result?.message || result?.error?.message);
        toast.error(result?.error?.data?.message || result?.error?.message);
      } else {
        const user = result?.data?.data;
        console.log(user);
        toast.success(`Account created Successfully!`);
        dispatch(logout());
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="relative bg-white items-start py-12 flex flex-col-reverse md:flex-row-reverse">
      <Card className="w-full border-0 border-l-[1px] md:mr-16  max-w-md shadow-none rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Signup</CardTitle>
          <CardDescription>
            Fill up the information below to create an account{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomForm onSubmit={handleSubmit}>
            <FormInput name="name" label="Your Name"></FormInput>
            <FormInput name="email" label="Your Email"></FormInput>
            <FormInput name="address" label="Your Address"></FormInput>
            <FormInput name="phone" label="Your Phone"></FormInput>
            <FormInputWatch
              name="password"
              label="Your Password"
              type="password"
              onInputChange={setPassword}
              validate={(value) => {
                const passwordRegex =
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*?_+-])[A-Za-z\d@!#$%^&*?_+-]{8,32}$/;
                return (
                  passwordRegex.test(value) ||
                  "Password must be 8 characters at minimum and contain at least one uppercase letter, one lowercase letter, one number, and one special character from: @ ! # $ % ^ & * ? _ + -"
                );
              }}
            ></FormInputWatch>
            <FormInput
              name="confirmedPassword"
              label="Confirm Password"
              type="password"
              validate={(value) =>
                value === password || "Passwords Don't Match"
              }
            ></FormInput>
            <Button
              loading={isLoading}
              className="mt-6 text-white hover:bg-transparent hover:text-slate-800 bg-slate-800"
              htmlType="submit"
            >
              Sign up
            </Button>
          </CustomForm>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?
            <Link
              to="/login"
              className="text-slate-900 font-medium underline-offset-2 underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
      <div className="md:flex md:p-16 sticky top-16 left-0 hidden justify-center items-center">
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
