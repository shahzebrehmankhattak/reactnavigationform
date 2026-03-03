import { useSelector, useDispatch } from "react-redux";
import { updateField, setTab } from "../features/formSlice";
import formConfig from "../config/formConfig.json";
import { Input } from "../components/UI/Input";
import type { RootState } from "../features/store";
import { SummaryView } from "./SummaryView";
import { useState } from "react";
import { Select } from "../components/UI/Select";
import { FileUpload } from "../components/UI/FileUpload";
import { FaArrowRight } from "react-icons/fa";
import TabStepper from "../components/Layout/TabStepper";
import { validateField } from "../utils/validation";
import Button from "../components/UI/Button";
import type { FormField } from "../types/field.types";
import { useVisibleFields } from "../hooks/useVisibleFields";

const FormContainer = () => {
  const dispatch = useDispatch();
  const { currentTab, formData } = useSelector(
    (state: RootState) => state.form
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visibleFields = useVisibleFields({ currentTab, formData });
  
  const isTabValid = () => {
    return visibleFields.every((field) => {
      const value = formData[field.id];

      if (field.validation.required) {
        if (field.type === "file") {
          const fileValid =
            value && Array.isArray(value) ? value.length > 0 : !!value;
          if (!fileValid) return false;
        } else {
          const isFilled =
            value !== undefined &&
            value !== null &&
            value.toString().trim() !== "";
          if (!isFilled) return false;
        }
      }

      if (field.validation.pattern && value) {
        const isPatternValid = validateField(
          field.validation.pattern,
          value.toString()
        );
        if (!isPatternValid) return false;
      }

      return true;
    });
  };

  const handleNext = () => {
    if (isTabValid()) {
      dispatch(setTab(currentTab + 1));
    }
  };

  const handleFinalSubmit = async () => {
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

  const renderField = (field: FormField) => {
    const commonProps = {
      label: field.label,
      value: formData[field.id] || "",
      required: field.validation?.required,
      pattern: field.validation?.pattern,
      onChange: (value: string) => {
        dispatch(updateField({ id: field.id, value }));
      },
    };

    switch (field.type) {
      case "text":
      case "textarea":
      case "email":
        return <Input {...commonProps} />;

      case "dropdown":
        return <Select {...commonProps} options={(field.options || []).map(opt => typeof opt === 'string' ? opt : opt.value)}/>;

      case "file":
        return (
          <FileUpload
            label={field.label}
            isMulti={field.isMulti}
            required={field.validation.required}
            onUpload={(files) =>
              dispatch(updateField({ id: field.id, value: files }))
            }
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-2 py-4">
            <input
              type="checkbox"
              checked={!!formData[field.id]}
              onChange={(e) =>
                dispatch(updateField({ id: field.id, value: e.target.checked }))
              }
              className="w-5 h-5 accent-blue-600"
            />
            <label className="text-sm font-medium text-gray-700">
              {field.label}
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto bg-white  px-2 md:px-20 h-auto">
        <TabStepper
          tabs={formConfig.tabs}
          currentTab={currentTab}
          onTabClick={(id) => dispatch(setTab(id))}
        />

        <div className="p-8">
          <h2 className="text-[#3f6ba1] text-xl font-semibold mb-3">
            {formConfig.tabs.find((tab) => tab.id === currentTab)?.label}
          </h2>
          <p className="text-[#777777] text-sm font-medium mb-4">
            A sub-heading is a mini-headline given to subsection or paragraph
            within a main piece of writing. They're smaller than the main
            headline but larger than paragraph text of the article
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {currentTab < 4 ? (
              visibleFields.map((field) => (
                <div
                  key={field.id}
                  className={
                    field.type === "textarea" ||
                    field.id === "address" ||
                    field.id === "purpose"
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  {renderField(field as FormField)}
                </div>
              ))
            ) : (
              <div className="md:col-span-2">
                <SummaryView />
              </div>
            )}
          </div>

          <div className="mt-12 pt-6  flex justify-between items-center">
            <div className="flex gap-2 md:gap-4">
              {currentTab < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isTabValid()}
                  icon={<FaArrowRight />}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleFinalSubmit}
                  disabled={!formData.agreement}
                  loading={isSubmitting}
                  variant="secondary"
                >
                  Submit Application
                </Button>
              )}
            </div>
            <Button
              onClick={() => dispatch(setTab(currentTab - 1))}
              disabled={currentTab === 1 || isSubmitting}
              variant="outline"
            >
              Previous
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};


export default FormContainer;