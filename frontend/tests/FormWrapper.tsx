import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormProps,
} from "react-hook-form";
import { ZodType } from "zod";

type FormWrapperProps<T extends FieldValues> = {
  children: ReactNode;
  schema: ZodType<T>;
  defaultValues?: Partial<T>;
  formOptions?: Omit<UseFormProps<T>, "resolver" | "defaultValues">;
};

export default function FormWrapper<T extends FieldValues>({
  children,
  schema,
  defaultValues,
  formOptions,
}: FormWrapperProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as any,
    ...formOptions,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
