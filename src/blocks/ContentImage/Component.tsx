"use client";

import { cn } from "src/utilities/cn";
import React from "react";
import RichText from "@/components/RichText";
import { Media } from "@/components/Media";

import type { Page } from "@/payload-types";

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

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 w-full border-t border-border">
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
              "lg:border-r": !isImageLeft,
              "lg:border-l": isImageLeft,
            },
            "md:col-span-12 lg:col-span-4 p-8 border-gray-200"
          )}
        >
          <div className=" page-with-header">
            <h2 className="page-header">{title}</h2>
          </div>
          {richText && <RichText content={richText} />}
        </div>
      </div>
    </div>
  );
};
