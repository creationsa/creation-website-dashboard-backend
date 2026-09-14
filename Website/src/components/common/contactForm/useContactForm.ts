"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmail } from "./sendEmail";
import { ContactFormValues, createContactSchema } from "./contactSchema";
import { FormErrorsTranslation } from "@/dictionaries/types";

type Status = "idle" | "success" | "error";

export function useContactForm(form_errors: FormErrorsTranslation) {
  const [status, setStatus] = useState<Status>("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(createContactSchema(form_errors)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      message: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("idle");

    try {
      await sendEmail(data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return {
    ...form,
    status,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
