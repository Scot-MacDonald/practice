"use client";

import { cn } from "@/utilities/cn";
import useClickableCard from "@/utilities/useClickableCard";
import Link from "next/link";
import React, { Fragment } from "react";

import type { Post, Doctor } from "@/payload-types";

import { Media } from "@/components/Media";

type RelationType = "posts" | "doctors";

type CardRelatedProps = {
  alignItems?: "center";
  className?: string;
  doc?: Post | Doctor;
  relationTo: RelationType;
  showCategories?: boolean;
  title?: string;
};

export const CardRelated: React.FC<CardRelatedProps> = (props) => {
  const { card, link } = useClickableCard({});
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
  } = props;

  if (!doc || typeof doc === "string") return null;

  const { slug, categories, meta, title } = doc as Post | Doctor;

  const { description, image: metaImage } = meta || {};
  const hasCategories =
    categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const sanitizedDescription = description?.replace(/\s/g, " ") || "";
  const href = `/${relationTo}/${slug}`;

  return (
    <article
      className={cn(
        "border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer",
        className
      )}
      ref={card.ref}
    >
      {/* Optional image block */}
      {/* <div className="relative w-full">
        {!metaImage && <div className="bg-gray-100 h-48 flex items-center justify-center">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="360px" />}
      </div> */}

      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {categories.map((category, index) => {
              if (typeof category === "object" && category !== null) {
                const categoryTitle = category.title || "Untitled category";
                const isLast = index === categories.length - 1;

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                );
              }
              return null;
            })}
          </div>
        )}

        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        {sanitizedDescription && (
          <div className="mt-2 text-sm">
            <p>{sanitizedDescription}</p>
          </div>
        )}
      </div>
    </article>
  );
};
