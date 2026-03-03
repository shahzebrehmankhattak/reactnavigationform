 export interface InputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  pattern?: 'email' | 'phone' | string;
}