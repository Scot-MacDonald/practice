"use client";

import React from "react";
import Link from "next/link";
import RichText from "@/components/RichText";

// ✅ Robust helper that handles URLs, filenames, and Payload Media objects
const getMediaUrl = (metaImage: any): string | null => {
  if (!metaImage) return null;

  // If it's already a full URL
  if (typeof metaImage === "string" && /^(https?:)?\/\//.test(metaImage)) {
    return `${metaImage}?v=${Date.now()}`;
  }

  // If it's a string path or filename
  if (typeof metaImage === "string") {
    // /media/... path from Payload (common in production)
    if (metaImage.startsWith("/")) return `${metaImage}?v=${Date.now()}`;
    // media/... without leading slash
    if (metaImage.startsWith("media/")) return `/${metaImage}?v=${Date.now()}`;
    // fallback to /api/media/file/
    return `/api/media/file/${metaImage}?v=${Date.now()}`;
  }

  // If it's a Payload Media object
  if (typeof metaImage === "object") {
    if (metaImage.url) {
      const url = metaImage.url.startsWith("/")
        ? metaImage.url
        : `/${metaImage.url}`;
      return `${url}?v=${Date.now()}`;
    }
    if (metaImage.id) return `/api/media/${metaImage.id}?v=${Date.now()}`;
    if (metaImage.filename)
      return `/api/media/file/${metaImage.filename}?v=${Date.now()}`;
  }

  return null;
};

export default function MitgliedBlock({ title, description, items }) {
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
          <div className="flex gap-4 items-center mt-6">
            {/* Static images with cache busting */}
            <img
              src={getMediaUrl("/media/bng.jpg")!}
              alt="Image 1"
              className="w-24 h-28 rounded-lg object-cover"
            />
            <img
              src={getMediaUrl("/media/daig_dagnae_siegel.jpg")!}
              alt="Image 2"
              className="w-26 h-24 rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Items grid */}
        <div className="col-span-12 sm:col-span-12 lg:col-span-6 xl:col-span-8 md:p-8 sm:p-4 p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const logoUrl = getMediaUrl(item.logo?.url || item.logo);

            return (
              <Link
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative border rounded-lg p-4 flex flex-col min-h-[138px] no-underline shadow-sm overflow-hidden"
              >
                {/* ✅ Dynamic logo background with cache-busting */}
                {logoUrl && (
                  <div
                    className="absolute inset-[20px] bg-center bg-contain bg-no-repeat pointer-events-none"
                    style={{ backgroundImage: `url('${logoUrl}')` }}
                  />
                )}

                {/* Foreground content (kept for future use) */}
                <div className="relative z-10">
                  {/* Title (optional) */}
                  {/*
                  <h2 className="text-xl font-bold mb-1 text-gray-800">
                    {item.title}
                  </h2>
                  */}

                  {/* Description (optional) */}
                  {/*
                  {item.description?.map((lineObj, j) => (
                    <span key={j} className="text-gray-600">
                      {lineObj.line}
                    </span>
                  ))}
                  */}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
