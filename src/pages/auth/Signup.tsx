import { HiOutlineUpload } from "react-icons/hi";
import { useState } from "react";
import { TReduxResponse } from "../../types/index";

import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
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
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "@/components/shared/form/CustomForm";
import FormInput from "@/components/shared/form/FormInput";
import { Button, ConfigProvider, Form, Upload } from "antd";
import FormInputWatch from "@/components/shared/form/FormInputWatch";
import FormUpload from "@/components/shared/form/FormUpload";

export default function Signup() {
  const [signup, { isLoading, isError, isSuccess }] = useSignupMutation();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<any>();

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

    const formData = new FormData();

    formData.append(
      "profileImage",
      data.profileImage.fileList[0].originFileObj
    );
    formData.append("data", JSON.stringify(userData));

    try {
      const result = (await signup(formData)) as TReduxResponse<any>;

      if (result?.error) {
        setFile([]);
        console.log(result.error)
        toast.error(result?.error?.data?.message || result?.error?.message);
      } else {
        setFile([]);
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
        <CardHeader className="text-left md:text-center">
          <CardTitle className="text-2xl  font-bold">Signup</CardTitle>
          <CardDescription>
            Fill up the information below to create an account{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomForm onSubmit={handleSubmit}>
            <ConfigProvider
              theme={{
                components: {
                  Upload: {
                    colorBorder: "#a2a2a2",
                  },
                },
              }}
            >
              {/* <Controller
                name="profileImage"
                rules={{
                  required: "Profile Image is required.",
                }}
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Form.Item
                    className="mt-4 self-center"
                    label="Upload a Profile Photo"
                    validateStatus={fieldState.error ? "error" : ""}
                    help={fieldState.error ? fieldState.error?.message : ""}
                  >
                    <Upload
                      {...field}
                      maxCount={1}
                      onChange={onChange}
                      accept="image/*"
                      // fileList={file}
                      defaultFileList={file}
                      showUploadList={true}
                      listType="picture-circle"
                      beforeUpload={() => false}
                    >
                      <button className="text-slate-700 text-4xl">
                        <HiOutlineUpload />
                      </button>
                    </Upload>
                  </Form.Item>
                )}
              /> */}
              <FormUpload name="profileImage" defaultFileList={file}
              label="Upload a Profile Photo" isError={isError}
              isSuccess={isSuccess} setImageUrl={setFile} required></FormUpload>
            </ConfigProvider>
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
        <CardFooter className="flex gap-2 justify-center">
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
      <div className="flex mx-auto md:hidden justify-center items-center">
        <LottieAnimation
          animationData={loginAnimationData}
          width={200}
          height={200}
        />
      </div>
    </section>
  );
}
