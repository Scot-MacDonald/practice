"use client";

import React from "react";
import Link from "next/link";
import RichText from "@/components/RichText";

const getMediaUrl = (metaImage: any): string | null => {
  if (!metaImage) return null;

  if (typeof metaImage === "string") return metaImage;

  if (metaImage.url)
    return metaImage.url.startsWith("/") ? metaImage.url : `/${metaImage.url}`;

  if (metaImage.filename) return `/api/media/file/${metaImage.filename}`;

  return null;
};

interface MitgliedBlockProps {
  title: string;
  description?: any;
  items: {
    logo?: any;
    url: string;
  }[];
}

export default function MitgliedBlock({
  title,
  description,
  items,
}: MitgliedBlockProps) {
  return (
    <>
      <div className="page-with-header mb-[20px] md:mb-[50px]">
        <h2 className="page-header px-4 flex flex-col lg:flex-row items-start lg:items-center gap-2">
          {title}
        </h2>
      </div>

      <div className="w-full grid grid-cols-12 mb-8">
        <div className="col-span-12 sm:col-span-12 lg:col-span-6 xl:col-span-4 p-4 lg:p-8 lg:border-r border-border">
          {description && <RichText content={description} />}
        </div>

        <div className="col-span-12 sm:col-span-12 lg:col-span-6 xl:col-span-8 md:p-8 sm:p-4 p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const logoUrl = getMediaUrl(item.logo);

            if (!logoUrl) return null;

            return (
              <Link
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-lg p-4 flex flex-col min-h-[138px] no-underline shadow-sm overflow-hidden"
              >
                <img
                  src={logoUrl}
                  alt={item.logo?.alt || `Logo ${i + 1}`}
                  className="w-full h-28 object-contain rounded-lg"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
