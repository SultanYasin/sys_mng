"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "../ui/submitButton";
import { useState } from "react";
import { formSchema } from "@/app/lib/Validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/lib/actions/user.action";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const UserForm = () => {
  // 1. Define  form.
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  async function onSubmit({
    name, email, phone, }: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      if (user) router.push(`/users/${user.$id}/register`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h2 className="header">Control Panel</h2>
          <p>Management system</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          control={form.control}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@test.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          control={form.control}
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone number"
          placeholder="0123456"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          control={form.control}
        />

        <SubmitButton isLoading={isLoading}>Login</SubmitButton>
      </form>
    </Form>
  );
};

export default UserForm;
