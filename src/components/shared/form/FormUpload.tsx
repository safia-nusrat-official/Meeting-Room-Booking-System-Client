import { Button, Form, Upload, UploadFile } from "antd";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { PiUploadSimpleLight } from "react-icons/pi";

const FormUpload = ({
  setImageUrl,
  name,
  label,
  required = true,
}: {
  name: string;
  label: string;
  required?: boolean;
  setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const imgBBApiKey = import.meta.env.VITE_IMGBBAPIKEY;

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;

    const form = new FormData();
    form.append("image", file);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?expiration=2000&key=${imgBBApiKey}`,
        {
          method: "POST",
          body: form,
        }
      );
      const result = await response.json();

      if (result?.success) {
        console.log(result.data);
        const imageURl = result.data.url;
        onSuccess(result);
        setImageUrl([imageURl]);
      } else {
        console.log(result, result?.error);
        onError(new Error(result?.error?.message || "Image Upload Failed"));
      }
    } catch (error) {
      console.log(error);
      onError(error as Error);
    }
  };
  return (
    <Controller
      rules={{
        required: required && `${label} are required.`,
      }}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          help={error && `${error.message}`}
          validateStatus={error && "error"}
        >
          <Upload showUploadList={false} {...field} customRequest={handleUpload}>
            <Button type="primary" size="large" icon={<PiUploadSimpleLight />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default FormUpload;
