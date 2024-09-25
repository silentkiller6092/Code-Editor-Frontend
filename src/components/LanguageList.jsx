import React from "react";
import { Tabs } from "@mantine/core";
function LanguageList() {
  return (
    <div className="bg-gray-900">
      <h1 className="text-center text-pink-300 text-4xl mb-10 relative z-20">
        Support of 60+ Languages
      </h1>

      <div className="">
        <Tabs keepMounted={false} defaultValue="first">
          <Tabs.List className="justify-center before:content-none">
            <Tabs.Tab value="first">Popular</Tabs.Tab>
            <Tabs.Tab value="second">Frontend</Tabs.Tab>
            <Tabs.Tab value="third">Backend</Tabs.Tab>
            <Tabs.Tab value="fourth">FullStack</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" className="">
            <div className="blur-[106px] right-0 absolute h-48 w-full bg-gradient-to-br from-blue-800 via-indigo-800 to-indigo-700 opacity-70 z-10"></div>

            <div className="p-4 flex flex-wrap justify-center relative z-20">
              {[0, 0, 0, 0, , 0, 0, 0, 0, 0].map((v, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer pl-4 md:pr-28 pr-7 md:py-4 py-2 m-3 w-max h-max border-transparent hover:border-blue-800 border-[1px] bg-gray-950"
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
          </Tabs.Panel>
          <Tabs.Panel value="second">Second panel</Tabs.Panel>
          <Tabs.Panel value="third">Second panel</Tabs.Panel>
          <Tabs.Panel value="fourth">Second panel</Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default LanguageList;
