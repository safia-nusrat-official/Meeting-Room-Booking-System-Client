import { Form, Select, SelectProps } from "antd";
import { Controller, FieldValues, Validate } from "react-hook-form";

const FormSelect = ({
  name,
  label,
  options,
  placeholder = `Select ${label}`,
  defaultValue=[],
  required = true,
  validate,
}: {
  defaultValue?: string[];
  placeholder?: string;
  label: string;
  name: string;
  options: SelectProps["options"];
  required?: boolean;
  validate?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
    | undefined;
}) => {
  return (
    <div className="">
      <Controller
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
              <Select
                mode="multiple"
                size="large"
                placeholder={placeholder}
                {...field}
                style={{ width: "100%",
                    borderColor:"#020817"
                 }}
                 defaultValue={defaultValue||[]}
                options={options}
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default FormSelect;
