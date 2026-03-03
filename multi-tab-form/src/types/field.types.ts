export interface VisibleIfCondition {
    fieldId: string;
    value: any;
  }
  
  export interface FieldValidation {
    required?: boolean;
    pattern?: string;
  }
  
  export interface FormField {
    id: string;
    label: string;
    type: "text" | "textarea" | "email" | "dropdown" | "file" | "checkbox";
    tab: number;
    validation: FieldValidation;
    visibleIf?: VisibleIfCondition;
    options?: { label: string; value: string }[]; 
    isMulti?: boolean; 
  }