export interface FormState {
    currentTab: number;
    formData: MyFormData;
  }

  export interface MyFormData {
    name: string;
    email: string;
    city: string;
    phone: string;
    address: string;
    agreement: boolean;
    id: string;
    operatingCrew?: File[];
    maintenanceConfirmation?: File;
    medicalFacilityNote?: File;
    additionalAttachment?: File[];
    [key: string]: any
  }

 export interface FormState {
    currentTab: number;
    formData: MyFormData;
  }
  