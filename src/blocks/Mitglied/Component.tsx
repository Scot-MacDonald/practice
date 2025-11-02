"use client";

import React from "react";
import Link from "next/link";
import RichText from "@/components/RichText";

// Versioned URL helper for cache-busting
export const getMediaUrl = (media: any): string | null => {
  if (!media) return null;

  const url = media.url || `/api/media/file/${media.filename}`;
  const version = media.version || Date.now();
  return `${url}?v=${version}`;
};

interface MitgliedItem {
  logo?: any;
  url: string;
  title: string;
}

interface MitgliedBlockProps {
  title: string;
  description?: any;
  items: MitgliedItem[];
}

export default function MitgliedBlock({
  title,
  description,
  items,
}: MitgliedBlockProps) {
  return (
    <>
      {/* Section header */}
      <div className="page-with-header mb-[20px] md:mb-[50px]">
        <h2 className="page-header px-4 flex flex-col lg:flex-row items-start lg:items-center gap-2">
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
        {/* Left side with description */}
        <div className="col-span-12 sm:col-span-12 lg:col-span-6 xl:col-span-4 p-4 lg:p-8 lg:border-r border-border">
          {description && <RichText content={description} />}

          {/* Example hard-coded images (optional) */}
          <div className="flex gap-4 items-center mt-6">
            <img
              src={getMediaUrl({ filename: "bng.jpg" })!}
              alt="Image 1"
              className="w-24 h-28 rounded-lg object-cover"
            />
            <img
              src={getMediaUrl({ filename: "daig_dagnae_siegel.jpg" })!}
              alt="Image 2"
              className="w-26 h-24 rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Items grid */}
        <div className="col-span-12 sm:col-span-12 lg:col-span-6 xl:col-span-8 md:p-8 sm:p-4 p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const logoUrl = getMediaUrl(item.logo);
            const altText = item.logo?.alt || item.title || "Mitglied logo";

            return (
              <Link
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative border rounded-lg p-4 flex flex-col min-h-[138px] no-underline shadow-sm overflow-hidden"
              >
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt={altText}
                    className="absolute inset-[20px] w-[calc(100%-40px)] h-[calc(100%-40px)] object-contain pointer-events-none"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
