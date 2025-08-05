//

import type { Metadata } from "next";

// import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from "@/components/PayloadRedirects";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";
import RichText from "@/components/RichText";

import type { Doctor } from "@/payload-types";
import { RelatedDoctors } from "@/blocks/RelatedDoctors/Components";
import { PostHero } from "@/heros/PostHero"; // ✅ Rename to DoctorHero if desired
import { generateMeta } from "@/utilities/generateMeta";
import PageClient from "./page.client";
import { TypedLocale } from "payload";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const doctors = await payload.find({
    collection: "doctors",
    draft: false,
    limit: 1000,
    overrideAccess: false,
  });

  return doctors.docs.flatMap(({ slug }) =>
    routing.locales.map((locale) => ({
      slug,
      locale,
    }))
  );
}

type Args = {
  params: Promise<{
    slug?: string;
    locale?: TypedLocale;
  }>;
};

export default async function Doctor({ params: paramsPromise }: Args) {
  const { slug = "", locale = "en" } = await paramsPromise;
  const url = `/doctors/${slug}`;
  const doctor = await queryDoctor({ slug, locale });

  if (!doctor) return <PayloadRedirects url={url} />;

  return (
    <article className="pt-16 pb-16 px-8">
      <div className="page-with-header mb-[70px] sm:mb-[14px]">
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
          {doctor.title}
        </h2>
      </div>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Column: Hero and Main Content */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          {/* PostHero (DoctorHero) */}
          <PostHero post={doctor} />

          {/* Main content */}
          <RichText
            className="max-w-full"
            content={doctor.content}
            enableGutter={false}
          />
        </div>

        {/* Right Column: Related Doctors */}
        <div className="lg:col-span-6 ">
          {doctor.relatedDoctors && doctor.relatedDoctors.length > 0 && (
            <RelatedDoctors
              className="sticky top-20 space-y-6 pt-8"
              docs={doctor.relatedDoctors.filter(
                (doc) => typeof doc === "object"
              )}
            />
          )}
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "", locale = "en" } = await paramsPromise;
  const doctor = await queryDoctor({ slug, locale });

  return generateMeta({
    doc: doctor,
    collection: "doctors",
  } as any);
}

const queryDoctor = cache(
  async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
    const { isEnabled: draft } = await draftMode();
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "doctors",
      draft,
      limit: 1,
      overrideAccess: draft,
      locale,
      where: {
        slug: {
          equals: slug,
        },
        _status: {
          equals: "published",
        },
      },
    });

    return result.docs?.[0] || null;
  }
);
