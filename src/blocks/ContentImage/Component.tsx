"use client";

import { cn } from "src/utilities/cn";
import React from "react";
import RichText from "@/components/RichText";
import { Media } from "@/components/Media";

import type { Page } from "@/payload-types";
import { usePathname } from "next/navigation";

type Props = Extract<Page["layout"][0], { blockType: "contentImage" }> & {
  id?: string;
};

export const ContentImageBlock: React.FC<Props> = ({
  title,
  richText,
  image,
}) => {
  const pathname = usePathname();

  return (
    <div className="">
      {/* Title Block (non-sticky) */}
      <div className="page-with-header mb-[70px] sm:mb-[14px]">
        {pathname === "/" ? (
          <h2 className="page-header px-4 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center gap-2">
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
        ) : (
          <h1 className="page-header px-4 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center gap-2">
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
          </h1>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 w-full">
        {/* Left: Rich Text */}
        <div className="md:col-span-12 lg:col-span-6 p-4 sm:p-8 border-gray-200">
          {richText && <RichText content={richText} />}
        </div>

        {/* Right: Sticky Image */}
        <div className="md:col-span-12 lg:col-span-6">
          {image && typeof image !== "string" && (
            <div
              className="sticky top-[6.5rem] p-4 sm:p-8 flex justify-center"
              style={{ maxHeight: "calc(100vh - 6.5rem)" }}
            >
              <Media
                resource={image}
                className="w-full h-full object-cover"
                size="100vw"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
