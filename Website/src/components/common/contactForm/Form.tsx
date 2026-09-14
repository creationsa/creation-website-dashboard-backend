"use client";

import AppButton from "@/components/ui/AppButton";
import dynamic from "next/dynamic";
import FormStatusMessage from "./FormStatusMessage";
import Input from "./Input";
import Label from "./Label";
import TextArea from "./TextArea";
import { FormProps } from "./types";
import { useContactForm } from "./useContactForm";

const CountrySelect = dynamic(() => import("./CountrySelect"), {
  ssr: false,
  loading: () => (
    <div className="bg-border-800 dark:bg-border-900 h-[60px] w-full animate-pulse rounded-md" />
  ),
});

export default function Form({ contact, form_errors, locale }: FormProps) {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    status,
    onSubmit,
  } = useContactForm(form_errors);

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <Input
        name="name"
        label={contact.full_name}
        error={errors.name?.message}
        placeholder={contact.full_name_placeholder}
        register={register("name")}
      />

      <div className="grid grid-cols-1 gap-x-20 gap-y-10 sm:grid-cols-2">
        <Input
          name="email"
          label={contact.email}
          error={errors.email?.message}
          placeholder={contact.email_placeholder}
          register={register("email")}
        />
        <Input
          name="company"
          label={contact.company}
          error={errors.company?.message}
          placeholder={contact.company_placeholder}
          register={register("company")}
        />
        <Input
          name="phone"
          label={contact.phone}
          error={errors.phone?.message}
          placeholder={contact.phone_placeholder}
          register={register("phone")}
        />
        <div className="w-full">
          <Label
            name="country"
            label={contact.country}
            error={errors.country?.message}
          />
          <CountrySelect
            name="country"
            error={errors.country?.message}
            placeholder={contact.country_placeholder}
            control={control}
            locale={locale}
          />
        </div>
      </div>

      <TextArea
        name="message"
        rows={8}
        label={contact.message}
        error={errors.message?.message}
        placeholder={contact.message_placeholder}
        register={register("message")}
      />

      <AppButton
        label={isSubmitting ? form_errors.sending : form_errors.send_message}
        type="submit"
        className="mt-2 w-full! text-center!"
      />

      <FormStatusMessage
        status={status}
        successMessage={form_errors.success_message}
        errorMessage={form_errors.error_message}
      />
    </form>
  );
}
