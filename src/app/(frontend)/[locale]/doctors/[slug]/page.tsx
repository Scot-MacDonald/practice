//

import type { Metadata } from 'next'

// import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Doctor } from '@/payload-types'

import { PostHero } from '@/heros/PostHero' // ✅ Rename to DoctorHero if desired
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { TypedLocale } from 'payload'
import { routing } from '@/i18n/routing'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const doctors = await payload.find({
    collection: 'doctors',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return doctors.docs.flatMap(({ slug }) =>
    routing.locales.map((locale) => ({
      slug,
      locale,
    })),
  )
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: TypedLocale
  }>
}

export default async function Doctor({ params: paramsPromise }: Args) {
  const { slug = '', locale = 'en' } = await paramsPromise
  const url = `/doctors/${slug}`
  const doctor = await queryDoctor({ slug, locale })

  if (!doctor) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      <PostHero post={doctor} /> {/* ✅ consider replacing with <DoctorHero doctor={doctor} /> */}
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem]" content={doctor.content} enableGutter={false} />
          {/* {doctor.relatedDoctors && doctor.relatedDoctors.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={doctor.relatedDoctors.filter((doc) => typeof doc === 'object')}
            />
          )} */}
        </div>

        {/* {doctor.relatedDoctors && doctor.relatedDoctors.length > 0 && (
          <RelatedPosts
            className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
            docs={doctor.relatedDoctors.filter((doc) => typeof doc === 'object')}
          />
        )} */}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale = 'en' } = await paramsPromise
  const doctor = await queryDoctor({ slug, locale })

  return generateMeta({
    doc: doctor,
    collection: 'doctors',
  } as any)
}

const queryDoctor = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'doctors',
    draft,
    limit: 1,
    overrideAccess: draft,
    locale,
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
  })

  return result.docs?.[0] || null
})
