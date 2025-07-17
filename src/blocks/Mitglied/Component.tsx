import React from "react";
import Link from "next/link";

export default function MitgliedBlock({ heading, description, items }) {
  return (
    <div className="w-full grid grid-cols-12 border-t border-border">
      {/* 4-column section on the LEFT */}
      <div className="col-span-12 lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-border">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        <p>{description}</p>
      </div>

      {/* 8-column section on the RIGHT with dynamic items */}
      <div className="col-span-12 lg:col-span-8 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
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
  );
}
