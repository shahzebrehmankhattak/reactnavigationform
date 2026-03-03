import { useState } from "react";
import type { MyFormData } from "../types/form.types";

export const useFormSubmission = (formData: MyFormData) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!formData.agreement) {
      alert("Please accept the agreement to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Final Submission Data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting };
};