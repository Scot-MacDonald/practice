"use client";

import { cn } from "src/utilities/cn";
import React from "react";
import RichText from "@/components/RichText";
import Link from "next/link";

import type { Page } from "@/payload-types";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = Extract<Page["layout"][0], { blockType: "contentImage" }> & {
  id?: string;
};

// Type guard to check if image is a Media object
const isMediaObject = (
  img: unknown
): img is { filename: string; alt?: string } =>
  typeof img === "object" && img !== null && "filename" in img;

export const ContentImageBlock: React.FC<Props> = ({
  title,
  richText,
  image,
}) => {
  const pathname = usePathname();
  const t = useTranslations();

  const imageSrc = isMediaObject(image)
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/${image.filename}`
    : typeof image === "string"
      ? image
      : undefined;

  const imageAlt = isMediaObject(image) ? image.alt || "" : "";

  return (
    <div className="">
      {/* Title Block */}
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
        {/* Text */}
        <div className="md:col-span-12 lg:col-span-6 p-4 sm:p-8 border-gray-200 order-2 lg:order-1">
          {richText && <RichText content={richText} />}
          <div>
            <Link
              href="/"
              className="mt-8 bg-[#cde3c5] text-[#00264c] text-lg inline-flex items-center font-semibold px-4 py-2 rounded"
            >
              <img
                src="/api/media/file/D_Dark_Blue-1.svg"
                alt="Doctolib Logo"
                className="h-6 w-auto pr-2"
              />
              {t("appointment")}
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="md:col-span-12 lg:col-span-6 order-1 lg:order-2">
          {imageSrc && (
            <div
              className="sticky top-[6.5rem] p-4 sm:p-8 flex justify-center"
              style={{ maxHeight: "calc(100vh - 6.5rem)" }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
