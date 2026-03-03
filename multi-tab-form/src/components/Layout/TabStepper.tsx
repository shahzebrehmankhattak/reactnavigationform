import { FaCheck } from 'react-icons/fa';
import type { TabStepperProps } from '../../types/tabs.types';

const TabStepper = ({ tabs, currentTab, onTabClick }: TabStepperProps) => {
  return (
    <nav aria-label="Progress" className="w-full p-4 md:p-6">
      <ol className="flex flex-col md:flex-row items-start md:items-center w-full justify-center gap-4 md:gap-0">
        {tabs.map((tab, index) => {
          const isActive = currentTab === tab.id;
          const isCompleted = currentTab > tab.id;
          const isLast = index === tabs.length - 1;

          return (
            <li 
              key={tab.id} 
              className={`flex items-center w-full ${!isLast ? 'md:flex-1' : 'md:w-auto'}`}
            >
              <button
                disabled={!isCompleted}
                type="button"
                onClick={() => isCompleted && onTabClick?.(tab.id)}
                className={`
                  flex items-center gap-3 px-4 py-3 md:px-5 md:py-4 rounded-full whitespace-nowrap transition-all duration-300
                  w-full md:w-auto text-left
                  ${isActive ? "bg-[#163b82] text-white scale-[1.02] md:scale-105 shadow-md z-10" : ""}
                  ${isCompleted ? "bg-[#3c95da] text-white cursor-pointer hover:bg-[#2d84c7]" : ""}
                  ${!isActive && !isCompleted ? "bg-slate-200 text-[#163b82] opacity-70" : ""}
                `}
              >
                <span
                  className={`
                    flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold
                    ${isActive ? "bg-white text-[#163b82]" : ""}
                    ${isCompleted ? "bg-white text-[#3c95da]" : ""}
                    ${!isActive && !isCompleted ? "bg-slate-300 text-[#163b82]" : ""}
                  `}
                >
                  {isCompleted ? <FaCheck size={10} /> : `0${tab.id}`}
                </span>

                <span className="text-sm font-semibold truncate">{tab.label}</span>
              </button>

              {!isLast && (
                <div 
                  className={`
                    hidden md:block flex-1 h-[5px] min-w-[20px] relative  transition-colors duration-500
                    ${isCompleted ? "bg-[#3c95da]" : "bg-[#163b82]"}
                    ${!isActive && !isCompleted ? "bg-slate-200" : ""}
                  `}
                >
                  {/* Progress Fill Layer */}
                  <div
                    className={`
                      absolute left-0 top-0 h-full transition-all duration-700 ease-in-out
                      ${isCompleted ? "w-full bg-[#3c95da]" : "w-0"}
                    `}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default TabStepper;