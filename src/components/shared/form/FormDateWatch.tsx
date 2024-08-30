import { DatePicker, Form } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

const FormDateWatch = ({
  name,
  label,
  required,
  setValue,
}: {
  label: string;
  required?: boolean;
  name: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { control } = useForm();
  const inputValue = useWatch({
    control,
    name,
  });
  useEffect(() => {
    console.log(inputValue)
    
    if(setValue && inputValue){
      setValue(moment(inputValue?.$d).format("YYYY-MM-DD"))
    }if(!inputValue){
      setValue("")
    }
  }, [inputValue, setValue]);

  return (
    <div className="">
      <Controller
        control={control}
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

export default FormDateWatch;
