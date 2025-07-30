import React from "react";
import Link from "next/link";

export default function MitgliedBlock({ title, description, items }) {
  return (
    <>
      <div className="page-with-header mb-[44px]">
        <h2 className="page-header px-8 flex flex-col lg:flex-row items-start lg:items-center gap-2">
          <svg
            className="hidden lg:block"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" stroke="#7eb36a" strokeWidth="2">
              <line x1="3" x2="21" y1="12" y2="12" />
              <line
                x1="12"
                x2="12"
                y1="3"
                y2="21"
                className="AccordionVerticalLine"
              />
            </g>
          </svg>
          {title}
        </h2>
      </div>
      <div className="w-full grid grid-cols-12 mb-8">
        {/* 4-column section on the LEFT */}
        <div className="col-span-12 sm:col-span-12 lg:col-span-6 xl:col-span-4 p-8  lg:border-r border-border">
          <p>{description}</p>
        </div>

        {/* 8-column section on the RIGHT with dynamic items */}
        <div className="col-span-12 sm:col-span-12 lg:col-span-6 xl:col-span-8 p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border rounded-lg p-4 flex flex-col bg-white hover:bg-[#f0f8ec] transition-colors min-h-[138px] no-underline"
            >
              <h2 className="text-xl font-bold mb-1 text-gray-800">
                {item.title}
              </h2>
              {item.description.map((lineObj, j) => (
                <span key={j} className="text-gray-600">
                  {lineObj.line}
                </span>
              ))}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
