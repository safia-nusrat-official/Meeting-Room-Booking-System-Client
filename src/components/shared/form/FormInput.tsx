import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Controller, FieldValues, Validate } from "react-hook-form";

const FormInput = ({
  type = "text",
  name,
  label,
  min=1,
  step=1,
  max,
  placeholder = `Enter ${label}`,
  defaultValue,
  required = true,
  validate,
  disabled=false
}: {
  defaultValue?: string | number;
  placeholder?: string;
  label: string;
  name: string;
  min?: number;
  step?: number;
  max?: number;
  type?: "text" | "password" | "number";
  disabled?: boolean;
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
              {type !== "password" ? (
                <Input
                min={min}
                max={max}
                step={step||1}
                disabled={disabled}
                  {...field}
                  placeholder={placeholder}
                  size="large"
                  type={type}
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
