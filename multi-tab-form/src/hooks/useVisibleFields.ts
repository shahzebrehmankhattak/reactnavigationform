import formConfig from "../config/formConfig.json";
import type { FormField } from "../types/field.types";
import type { FormState } from "../types/form.types";

export const useVisibleFields = ({ currentTab, formData }: FormState) => {
  const currentFields = (formConfig.fields as FormField[]).filter(
    (f) => f.tab === currentTab
  );

  return currentFields.filter((field) => {
    if (!field.visibleIf) return true;
    return formData[field.visibleIf.fieldId] === field.visibleIf.value;
  });
};