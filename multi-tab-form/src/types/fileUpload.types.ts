 export interface FileRow {
  id: string;
  file: File | null;
  isUploading: boolean;
}
export interface FileUploadProps {
  label: string;
  onUpload: (files: File[]) => void;
  required?: boolean;
  isMulti?: boolean;
}