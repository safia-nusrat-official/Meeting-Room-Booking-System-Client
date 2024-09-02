import { HiOutlineUpload } from "react-icons/hi";
import { ReactNode, useState } from "react";

import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import FormInput from "@/components/shared/form/FormInput";
import { ConfigProvider, Form, Skeleton, Upload, UploadFile } from "antd";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Button as AntBtn } from "antd";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/user.api";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/features/authSlice";
import { TUser } from "@/types/user.types";
import CustomForm from "@/components/shared/form/CustomForm";
import { TReduxResponse } from "@/types";

export default function MyProfile() {
  const data = useAppSelector(getUser) as TUser;
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const { data: userData, isLoading } = useGetSingleUserQuery(
    data._id as string
  );
  const user: TUser = !isLoading && userData.data;

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData: Partial<TUser> = {
      address: data?.address,
      name: data.name,
      phone: data.phone,
    };
    console.log(userData);

    const formData = new FormData();

    formData.append(
      "profileImage",
      data.profileImage.fileList[0].originFileObj
    );
    formData.append("data", JSON.stringify(userData));

    try {
      const result = (await updateUser({
        id: userData._id as string,
        formData,
      })) as TReduxResponse<any>;
      console.log(result);

      if (result?.error) {
        console.log(result?.message || result?.error?.message);
        setFile([]);
        toast.error(result?.error?.data?.message || result?.error?.message);
      } else {
        const user = result?.data?.data;
        console.log(user);
        setFile([]);
        toast.success(`Account updated Successfully!`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [file, setFile] = useState<UploadFile<any>[]>(
    user.profileImage
      ? [{ name: "profile-image", uid: "1", url: user?.profileImage }]
      : []
  );

  return (
    <Card className="md:m-8 bg-white   shadow-none rounded-sm">
      <CardHeader className="">
        <CardTitle>My profile</CardTitle>
        <CardDescription>View and manage your profile settings</CardDescription>
      </CardHeader>
      <CardContent>
      {user && (
        <div className="w-full">
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
            <Controller
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
                  label={user.profileImage?"Upload a Profile Photo":"No Photo yet."}
                  validateStatus={fieldState.error ? "error" : ""}
                  help={fieldState.error ? fieldState.error?.message : ""}
                >
                  <Upload
                    maxCount={1}
                    onChange={onChange}
                    accept="image/*"
                    fileList={file}
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
            />
          </ConfigProvider>
          <FormInput
            name="name"
            defaultValue={user.name}
            label="Your Name"
          ></FormInput>
          <FormInput
            disabled
            name="email"
            defaultValue={user.email}
            label="Your Email"
          ></FormInput>
          <FormInput
            name="address"
            defaultValue={user.address}
            label="Your Address"
          ></FormInput>
          <FormInput
            name="phone"
            defaultValue={user.phone}
            label="Your Phone"
          ></FormInput>

          <AntBtn
            loading={isLoading}
            className="mt-6 text-white hover:bg-transparent hover:text-slate-800 bg-slate-800"
            htmlType="submit"
          >
            Update Information
          </AntBtn>
        </CustomForm>
      </div>
      )}
      {isLoading && <Skeleton active> </Skeleton>}
      </CardContent>
    </Card>
  );
}
