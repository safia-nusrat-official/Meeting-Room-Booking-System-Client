import {  Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

const FormTimePicker = ({
  name,
  label,
  defaultValue,
  required,
  clock = "24hr",
}: {
  label: string;
  required?: boolean;
  defaultValue?: any;
  name: string;
  clock?: "24hr" | "12hr";
}) => {
  return (
    <div className="mt-4">
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
              <TimePicker
                needConfirm={false}
                showNow={false}
                defaultValue={defaultValue}
                placeholder={`Enter ${label}`}
                size="large"
                style={{ width: "100%" }}
                {...field}
                format={clock === "24hr" ? "HH:mm" : "h:mm a"}
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default FormTimePicker;
