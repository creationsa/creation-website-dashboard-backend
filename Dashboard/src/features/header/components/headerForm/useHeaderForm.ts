import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useUpdateHeader } from "../../hooks/useUpdateHeader";
import type { HeaderProps } from "../../types";
import { buildHeaderFormData } from "./buildHeaderFormData";
import { createHeaderSchema, type HeaderFormValues } from "./headerSchema";
import getHeaderDefaultValues from "./getHeaderDefaultValues";

export default function useHeaderForm(headerToEdit?: HeaderProps) {
  const { updateHeader, updateHeaderLoading } = useUpdateHeader();

  const schema = useMemo(() => createHeaderSchema(), []);

  const form = useForm<HeaderFormValues>({
    defaultValues: getHeaderDefaultValues(headerToEdit),
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handleUpdateHeader = async (data: HeaderFormValues) => {
    const formData = buildHeaderFormData(data);

    updateHeader(formData, {
      onSuccess: () => form.reset(data),
    });
  };

  return {
    form,
    isLoading: Boolean(updateHeaderLoading),
    handleUpdateHeader,
  };
}
