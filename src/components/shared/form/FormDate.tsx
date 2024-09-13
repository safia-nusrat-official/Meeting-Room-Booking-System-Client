import { DatePicker, Form } from "antd";
import moment from "moment";
import { Controller } from "react-hook-form";

const FormDate = ({
  name,
  label,
  defaultValue,
  required,
}: {
  label: string;
  required?: boolean;
  defaultValue?: any;
  name: string;
}) => {

  const minDate = moment()
  const maxDate = moment("2024-12-31", "YYYY-MM-DD")
  const disabledDate = (current:any) => current && (current>maxDate||current<minDate)

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
                disabledDate={disabledDate}
                {...field}
                defaultValue={defaultValue}
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
