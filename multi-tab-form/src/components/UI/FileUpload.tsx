import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import type { FileRow, FileUploadProps } from "../../types/fileUpload.types";

export const FileUpload = ({ label, onUpload, required }: FileUploadProps) => {
  const [rows, setRows] = useState<FileRow[]>([
    { id: crypto.randomUUID(), file: null, isUploading: false },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { id: crypto.randomUUID(), file: null, isUploading: false },
    ]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    } else {
      updateRowState(id, { file: null });
    }
  };

  const updateRowState = (id: string, updates: Partial<FileRow>) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...updates } : row))
    );
  };

  const handleFileChange = async (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    updateRowState(id, { isUploading: true });

    await new Promise((resolve) => setTimeout(resolve, 800));

    setRows((prev) => {
      const updated = prev.map((row) =>
        row.id === id ? { ...row, file, isUploading: false } : row
      );

      const allFiles = updated.map((r) => r.file).filter((f): f is File => !!f);

      onUpload(allFiles);

      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-1 mb-6 max-w-md">
      <label className="text-sm font-bold text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex flex-col gap-3">
        {rows.map((row, index) => (
          <div key={row.id} className="flex items-center gap-2">
            <div
              className={`flex flex-1 items-stretch border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm h-10 transition-opacity ${
                row.isUploading ? "opacity-60" : "opacity-100"
              }`}
            >
              <div className="flex items-center flex-1 px-3 gap-2 min-w-0">
                {row.isUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[11px] text-blue-500 font-medium">
                      Uploading...
                    </span>
                  </div>
                ) : row.file ? (
                  <>
                    <FiFileText size={16} className="text-slate-400 shrink-0" />
                    <span className="text-xs text-gray-500 truncate">
                      {row.file.name}
                    </span>
                    <button
                      onClick={() => updateRowState(row.id, { file: null })}
                      className="ml-auto text-pink-500 "
                    >
                      <MdClose size={14} />
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">Choose file</span>
                )}
              </div>

              <input
                type="file"
                id={`file-input-${row.id}`}
                onChange={(e) => handleFileChange(row.id, e)}
                className="hidden"
              />

              <label
                htmlFor={`file-input-${row.id}`}
                className="bg-slate-500 text-white px-4 text-xs font-medium hover:bg-slate-600 flex items-center cursor-pointer border-l border-gray-200"
              >
                Upload
              </label>
            </div>

            {index === 0 ? (
              <button
                onClick={addRow}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0099d4] text-white hover:bg-[#0081b3] shadow-sm shrink-0"
              >
                <FaPlus size={18} strokeWidth={3} />
              </button>
            ) : (
              <button
                onClick={() => removeRow(row.id)}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 shrink-0"
              >
                <MdClose size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-400 mt-1 italic">
        Accepted Formats (.pdf/.xlsx/.png/.jpeg)
      </p>
    </div>
  );
};
