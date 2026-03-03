import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../features/store';
import formConfig from '../config/formConfig.json';
import { updateField } from '../features/formSlice';

export const SummaryView = () => {
  const { formData } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const tabs = [
    { id: 1, label: "Application Information" },
    { id: 2, label: "Purpose and Documents" },
    { id: 3, label: "Additional Information" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500"> 
      {tabs.map((tab) => (
        <section key={tab.id} className="p-1 md:p-4">
          <h3 className="text-base md:text-lg font-semibold text-[#3c95da] mb-4">{tab.label}</h3>
          <div className="grid gap-4 w-full md:w-[500px]">
            {formConfig.fields
              .filter((field) => field.tab === tab.id)
              .map((field) => {
                const value = formData[field.id];
                
                if (value === undefined || value === null || value === '') return null;

                return (
                  <div key={field.id} className="pb-2 flex items-center justify-between">
                    <p className="text-xs md:text-sm text-[#373737] font-bold">{field.label}</p>
                    <p className="text-sm md:text-md text-[#373737] capitalize">
                      {field.type === 'file' 
                        ? (Array.isArray(value) ? `${value.length} files uploaded` : 'File uploaded') 
                        : String(value)}
                    </p>
                  </div>
                );
              })}
          </div>
        </section>
      ))}

      <div className="bg-blue-50 p-4 rounded border border-blue-200">
        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            required 
            checked={!!formData.agreement}
            className="w-5 h-5 accent-blue-600"
            onChange={(e) => { 
               dispatch(updateField({ id: 'agreement', value: e.target.checked }));
            }}
          />
          <span className="text-sm font-medium">I agree to the terms and conditions</span> 
        </label>
      </div>
    </div>
  );
};