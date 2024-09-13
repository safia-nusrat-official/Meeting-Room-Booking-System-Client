import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller, FieldValues, Validate } from "react-hook-form";

const FormTextArea = ({
  name,
  label,
  placeholder = `Enter ${label}`,
  defaultValue,
  required = true,
  validate,
}: {
  defaultValue?: string | number;
  placeholder?: string;
  label: string;
  name: string;
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
                <TextArea
                  {...field}
                  placeholder={placeholder}
                  size="large"
                  id={name}
                  autoSize={{
                    minRows:3
                  }}
                />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default FormTextArea;
