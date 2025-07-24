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
  mediaPosition = "right",
}) => {
  const isImageLeft = mediaPosition === "left";
  const pathname = usePathname();
  return (
    <div className="w-full">
      <div className="page-with-header mx-8">
        {pathname === "/" ? (
          <h2 className="page-header flex items-center gap-2">
            <svg
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
          <h1 className="page-header flex items-center gap-2">
            <svg
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
      <div className="grid grid-cols-1 md:grid-cols-12 w-full ">
        {/* Image first in markup so it shows first on mobile */}
        <div
          className={cn("md:col-span-12 lg:col-span-8", {
            "lg:order-1": isImageLeft,
            "lg:order-2": !isImageLeft,
          })}
        >
          {image && typeof image !== "string" && (
            <div className="p-[50px] min-h-[calc(100vh-87px)] flex justify-center">
              <Media
                resource={image}
                className="w-full h-full object-cover"
                size="100vw"
              />
            </div>
          )}
        </div>

        {/* Text second in markup, shows below image on mobile */}
        <div
          className={cn(
            {
              "lg:order-2": isImageLeft,
              "lg:order-1": !isImageLeft,
              // "lg:border-r": !isImageLeft,
              // "lg:border-l": isImageLeft,
            },
            "md:col-span-12 lg:col-span-4 p-8 border-gray-200"
          )}
        >
          {richText && <RichText content={richText} />}
        </div>
      </div>
    </div>
  );
};
