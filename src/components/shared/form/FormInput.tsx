import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Controller, FieldValues, Validate } from "react-hook-form";

const FormInput = ({
  type = "text",
  name,
  label,
  placeholder = `Enter ${label}`,
  defaultValue,
  required = true,
  validate
}: {
  defaultValue?: string;
  placeholder?: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  validate?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
    | undefined;
}) => {
  return (
    <div className="">
      <Controller
        defaultValue={defaultValue}
        name={name}
        rules={{
          required: required && `${label} is required`,
          validate,
        }}
        render={({ field, fieldState }) => {
          return (
            <Form.Item
              label={label}
              validateStatus={fieldState.error ? "error" : ""}
              help={fieldState.error ? fieldState.error.message : ""}
            >
              {type === "text" ? (
                <Input
                  {...field}
                  placeholder={placeholder}
                  size="large"
                  id={name}
                />
              ) : (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder={placeholder}
                  id={name}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              )}
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default FormInput;
