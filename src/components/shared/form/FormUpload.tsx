import { Button, Form, Spin, Upload, UploadFile } from "antd";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { PiUploadSimpleLight } from "react-icons/pi";

export const imgBBApiKey = import.meta.env.VITE_IMGBBAPIKEY;

const FormUpload = ({
  setImageUrl,
  name,
  label,
  isSuccess,
  isError,
  imgUrl,
  defaultFileList = [],
  required = true,
}: {
  name: string;
  label: string;
  imgUrl: string[];
  isSuccess: boolean;
  isError: boolean;
  defaultFileList?: UploadFile<any>[];
  required?: boolean;
  setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>(defaultFileList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (isSuccess || isError) && setFileList([]);

    if (defaultFileList) {
      setImageUrl(defaultFileList.map((file) => file.url as string));
    }

    if (fileList) {
      setImageUrl(fileList.map((file) => file.url as string));
    }
    console.log(fileList)
    
  }, [isSuccess, isError, fileList]);

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    setLoading(true);
    const form = new FormData();
    form.append("image", file);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`,
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
        setLoading(false);
        setFileList([
          ...fileList,
          {
            name: result.data.title,
            url: imageURl,
            uid: result.data.id,
          },
        ]);
      } else {
        console.log(result, result?.error);
        onError(new Error(result?.error?.message || "Image Upload Failed"));
      }
    } catch (error) {
      console.log(error);
      onError(error as Error);
    }
  };

  const onRemove = (file: UploadFile<any>) => {
    setFileList(fileList.filter((prev) => prev.uid !== file.uid));
    console.log("File List image removed in side onRemove", fileList);
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
          <Upload
            listType="picture-card"
            showUploadList={true}
            maxCount={3}
            {...field}
            customRequest={handleUpload}
            fileList={fileList}
            onRemove={onRemove}
          >
            {loading ? (
              <Spin spinning></Spin>
            ) : (
              <div className="flex flex-col text-xs items-center font-bold">
                <PiUploadSimpleLight className="text-2xl font-bold" />
                <p>
                  {fileList.length > 4 ? "Max Upload Limit 4" : "Upload Image"}
                </p>
              </div>
            )}
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default FormUpload;
