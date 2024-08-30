import { DatePicker, Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

const FormTimePicker = ({
  name,
  label,
  required,
}: {
  label: string;
  required?: boolean;
  name: string;
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
              <TimePicker needConfirm={false} showNow={false}  placeholder={`Enter ${label}`} size="large" style={{width:"100%"}} {...field} format={"HH:mm"} />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default FormTimePicker;
