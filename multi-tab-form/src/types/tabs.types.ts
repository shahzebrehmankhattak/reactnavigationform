export interface Tab {
    id: number;
    label: string;
  }
  
export  interface TabStepperProps {
    tabs: Tab[];
    currentTab: number;
    onTabClick?: (tabId: number) => void;
  }