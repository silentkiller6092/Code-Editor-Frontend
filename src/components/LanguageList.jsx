import React from "react";

function LanguageList() {
  return (
    <div className="p-4 flex flex-wrap justify-center">
      {[0, 0, 0, 0, , 0, 0, 0, 0, 0].map((v, idx) => (
        <div
          key={idx}
          className="bg-[#1E293B] cursor-pointer pl-4 pr-28 py-4 m-3 w-max h-max border-transparent hover:border-blue-800 border-[1px] transition-all"
        >
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <div className="ml-2">
              <h3 className="text-white font-medium">Angular</h3>
              <p className="text-gray-400 text-sm">TypeScript</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LanguageList;
