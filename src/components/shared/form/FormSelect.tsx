import { Form, Select, SelectProps } from "antd";
import { Controller, FieldValues, Validate } from "react-hook-form";

const FormSelect = ({
  name,
  label,
  options,
  loading,
  mode,
  placeholder = `Select ${label}`,
  defaultValue = [],
  required = true,
  validate,
}: {
  defaultValue?: string[];
  placeholder?: string;
  label: string;
  name: string;
  loading?: boolean;
  mode?: "multiple" | "tags" | undefined;
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
                mode={mode}
                size="large"
                loading={loading}
                placeholder={placeholder}
                {...field}
                style={{ width: "100%", borderColor: "#020817" }}
                defaultValue={defaultValue || []}
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
