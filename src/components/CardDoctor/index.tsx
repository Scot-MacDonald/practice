"use client";
import { cn } from "@/utilities/cn";
import useClickableCard from "@/utilities/useClickableCard";
import Link from "next/link";
import React, { Fragment } from "react";
import Image from "next/image";

import type { Doctor } from "@/payload-types";
import { Media } from "@/components/Media";

export const CardDoctor: React.FC<{
  alignItems?: "center";
  className?: string;
  doc?: Doctor;
  relationTo?: "doctors";
  showCategories?: boolean;
  title?: string;
}> = (props) => {
  const { card, link } = useClickableCard({});
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
  } = props;

  const { slug, categories, meta, title } = doc || {};
  const { description, image: metaImage } = meta || {};

  const hasCategories =
    categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const sanitizedDescription = description?.replace(/\s/g, " ");
  const href = `/${relationTo}/${slug}`;

  // 👇 Check if image is a URL or just a filename
  const isUrl = typeof metaImage === "string" && metaImage.startsWith("http");
  const isFilename =
    typeof metaImage === "string" && !metaImage.startsWith("http");

  return (
    <article
      className={cn(
        " data-cursor-hover border border-border rounded-lg p-4 transition-colors hover:bg-[rgba(126,179,106,0.1);] ",
        className
      )}
      ref={card.ref}
      data-cursor-hover
    >
      <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {!metaImage && <div className="text-sm text-gray-500">No image</div>}

        {isUrl && (
          <Image
            src={metaImage as string}
            alt={titleToUse || "Doctor image"}
            width={239}
            height={239}
            className="object-cover w-full h-full"
          />
        )}

        {isFilename && (
          <Image
            src={`/api/media/file/${metaImage}`}
            alt={titleToUse || "Doctor image"}
            width={239}
            height={239}
            className="object-cover w-full h-full"
          />
        )}

        {metaImage && typeof metaImage === "object" && (
          <Media resource={metaImage} size="360px" />
        )}
      </div>

      <div className="pt-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4 text-gray-500">
            {categories.map((category, index) => {
              if (typeof category === "object") {
                const categoryTitle = category.title || "Untitled category";
                const isLast = index === categories.length - 1;
                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <>,&nbsp;</>}
                  </Fragment>
                );
              }
              return null;
            })}
          </div>
        )}

        {titleToUse && (
          <div className="prose">
            <h3 className="text-base text-gray-600 font-bold">
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        {description && (
          <p className="mt-1 text-sm text-gray-600 font-medium">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  );
};
