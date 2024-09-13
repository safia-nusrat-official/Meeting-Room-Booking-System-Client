import { HiOutlineUpload } from "react-icons/hi";
import { useState } from "react";

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
  const { data: user, isLoading } = useGetSingleUserQuery(
    data._id as string
  );
  const userData: TUser = !isLoading  && user?.data;

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const payload: Partial<TUser> = {
      address: data?.address,
      name: data?.name,
      phone: data?.phone,
    };

    const formData = new FormData();

    formData.append(
      "profileImage",
      data?.profileImage?.fileList[0].originFileObj
    );
    formData.append("data", JSON.stringify(payload));

    try {
      const result = (await updateUser({
        id: userData?._id as string,
        formData,
      })) as TReduxResponse<any>;
      console.log(result);

      if (result?.error) {
        setFile([]);
        toast.error(result?.error?.data?.message || result?.error?.message);
      } else {
        const user = result?.data?.data;
        setFile([]);
        toast.success(`Profile updated Successfully!`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [file, setFile] = useState<UploadFile<any>[]>([]);

  return (
    <Card className="md:m-8 bg-white   shadow-none rounded-sm">
      <CardHeader className="">
        <CardTitle>My profile</CardTitle>
        <CardDescription>View and manage your profile settings</CardDescription>
      </CardHeader>
      <CardContent>
        {userData && (
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
                  render={({
                    field: { value, onChange, ...field },
                    
                  }) => (
                    <Form.Item
                      className="mt-4 self-center"
                    >
                      <Upload
                      {...field}
                        maxCount={1}
                        onChange={onChange}
                        accept="image/*"
                        defaultFileList={[{ name: "profile-image", uid: "1", url: userData?.profileImage }]}
                        // fileList={file}
                        showUploadList={true}
                        listType="picture-circle"
                        beforeUpload={()=>false}
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
                defaultValue={userData.name}
                label="Your Name"
              ></FormInput>
              <FormInput
                disabled
                name="email"
                defaultValue={userData.email}
                label="Your Email"
              ></FormInput>
              <FormInput
                name="address"
                defaultValue={userData.address}
                label="Your Address"
              ></FormInput>
              <FormInput
                name="phone"
                defaultValue={userData.phone}
                label="Your Phone"
              ></FormInput>

              <AntBtn
                loading={isLoading||updateLoading}
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
