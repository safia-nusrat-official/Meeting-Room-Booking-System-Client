import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const CustomForm = ({
  children,
  onSubmit,

  resetForm = true,
  defaultValues,
}: {
  resetForm?: boolean;
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: any;
}) => {
  const methods = useForm();

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    if (resetForm) {
      methods.reset();
    }
  };
  return (
    <FormProvider {...methods}>
      <Form
        defaultValue={defaultValues}
        layout="vertical"
        className="font-inter flex flex-col"
        onFinish={methods.handleSubmit(submit)}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default CustomForm;
