export interface SelectProps {
    label: string;
    value: string;
    options?: string[];
    onChange: (val: string) => void;
    required?: boolean;
  }