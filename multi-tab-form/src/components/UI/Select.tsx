import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import type { SelectProps } from "../../types/select.types";

export const Select = ({
  label,
  value,
  options,
  onChange,
  required,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1 mb-4 w-full max-w-sm" ref={dropdownRef}>
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span
            className={`px-3 py-2 ${value ? "text-gray-900" : "text-gray-500"}`}
          >
            {value || "Select purpose"}
          </span>

          <span className="flex items-center justify-center px-3 py-3 border-l border-gray-300 ">
            <FaChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        {open && (
          <div className="absolute z-[100] mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {options?.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-100"
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
