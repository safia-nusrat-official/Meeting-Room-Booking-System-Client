import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

const FormDate = ({
  name,
  label,
  required,
}: {
  label: string;
  required?: boolean;
  name: string;
}) => {
  return (
    <div className="">
      <Controller
        rules={{
          required: required && `${label} is required.`,
        }}
        name={name}
        render={({ field, fieldState }) => {
          return (
            <Form.Item
              label={label}
              validateStatus={fieldState.error ? "error" : ""}
              help={fieldState.error ? fieldState.error?.message : ""}
            >
              <DatePicker
                {...field}
                size="large"
                style={{ width: "100%" }}
                onChange={field.onChange}
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default FormDate;
