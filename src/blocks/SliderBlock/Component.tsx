"use client";

import React from "react";
import { EmblaSlider } from "@/components/EmblaSlider";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/cn";

type Props = {
  title: string;
  richText?: any;
  images?: {
    image: string;
    alt?: string;
  }[];
};

export const SliderBlock: React.FC<Props> = ({
  title,
  richText,
  images = [],
}) => {
  const safeImages = Array.isArray(images) ? images : [];

  return (
    <div className="">
      <div className="page-with-header mb-[44px]">
        <h2 className="page-header  px-8">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 w-full">
        {/* Left: Rich Text (scrolls) */}
        <div className="md:col-span-12 lg:col-span-6 p-4 sm:p-8 border-gray-200">
          {richText && <RichText content={richText} />}
        </div>

        {/* Right: Sticky Slider */}
        <div className="md:col-span-12 lg:col-span-6">
          <div
            className="sticky top-[5rem] p-4 sm:p-8"
            style={{ maxHeight: "calc(100vh - 5rem)" }} // Adjust 5rem if your header is taller
          >
            <div className="h-full flex flex-col items-center justify-center">
              {safeImages.length > 0 && <EmblaSlider images={safeImages} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
