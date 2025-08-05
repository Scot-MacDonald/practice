import { formatDateTime } from "src/utilities/formatDateTime";
import React from "react";

import type { Post } from "@/payload-types";

import { Media } from "@/components/Media";
import { useTranslations } from "next-intl";

export const PostHero: React.FC<{
  post: Post;
}> = ({ post }) => {
  const {
    // categories,
    meta: { image: metaImage } = {},
    // populatedAuthors,
    // publishedAt,
    title,
  } = post;

  // const t = useTranslations()

  // return (
  //   <div className="relative -mt-[10.4rem] flex items-end">
  //     <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
  //       <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">

  /* <div className="uppercase text-sm mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div> */

  /* <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            <div className="flex flex-col gap-4">
              {populatedAuthors && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm">{t('author')}</p>
                  {populatedAuthors.map((author, index) => {
                    const { name } = author

                    const isLast = index === populatedAuthors.length - 1
                    const secondToLast = index === populatedAuthors.length - 2

                    return (
                      <React.Fragment key={index}>
                        {name}
                        {secondToLast && populatedAuthors.length > 2 && (
                          <React.Fragment>, </React.Fragment>
                        )}
                        {secondToLast && populatedAuthors.length === 2 && (
                          <React.Fragment> </React.Fragment>
                        )}
                        {!isLast && populatedAuthors.length > 1 && (
                          <React.Fragment>and </React.Fragment>
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>
              )}
            </div>
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">{t('date-published')}</p>
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div> */

  return (
    <div className="relative ">
      <div className=" grid grid-cols-1 lg:grid-cols-1 gap-8 items-center ">
        {/* LEFT: Text Content */}
        <div>
          {/* <div className="page-with-header mb-[70px] sm:mb-[14px]">
            <h2 className="page-header  flex flex-col lg:flex-row items-start lg:items-center gap-2">
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
          </div> */}
          {/* If you want to re-enable meta info, authors, categories, etc, insert it here */}
        </div>

        {/* RIGHT: Image */}
        {metaImage && typeof metaImage !== "string" && (
          <div className="w-full max-w-[336px] aspect-square relative">
            <Media
              className="w-full h-full"
              imgClassName="object-cover "
              resource={metaImage}
              fill
            />
          </div>
        )}
      </div>
    </div>
  );
};
