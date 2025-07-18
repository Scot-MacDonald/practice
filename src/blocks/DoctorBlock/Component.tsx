import type { Doctor, DoctorBlock as DoctorBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionDoctor } from '@/components/CollectionDoctor'

export const DoctorBlock: React.FC<
  DoctorBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let doctors: Doctor[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedDoctors = await payload.find({
      collection: 'doctors',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              specialties: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    doctors = fetchedDoctors.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedDoctors = selectedDocs.map((doctor) => {
        if (typeof doctor.value === 'object') return doctor.value
      }) as Doctor[]

      doctors = filteredSelectedDoctors
    }
  }

  return (
    <div className="" id={`block-${id}`}>
      {/* <div className=" page-with-header">
        <h2 className="page-header">Unser Team</h2>
      </div> */}

      <div className="w-full grid grid-cols-12 border-t border-border">
        <div className="col-span-4 p-8 border-r border-border">
          {introContent && <RichText className="" content={introContent} enableGutter={false} />}
        </div>

        {/* Doctors Collection */}
        <div className="col-span-8 p-8 ">
          <CollectionDoctor doctors={doctors} />
        </div>
      </div>
    </div>
  )
}
