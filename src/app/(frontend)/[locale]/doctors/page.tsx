import type { Metadata } from "next/types";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import React from "react";

import { DoctorBlock } from "@/blocks/DoctorBlock/Component";
import PageClient from "./page.client";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  // Fetch the "doctors" page from Payload Pages collection
  const page = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "doctors", // <-- Make sure this matches your actual page slug in CMS
      },
    },
  });

  // Find the first DoctorBlock in the layout (if any)
  const doctorBlock = page.docs[0]?.layout?.find(
    (block) => block.blockType === "doctor"
  );

  return (
    <div className="pt-24 pb-24">
      <PageClient />

      <div className="">
        {doctorBlock ? (
          <DoctorBlock
            {...{ ...doctorBlock, id: doctorBlock?.id ?? undefined }}
          />
        ) : (
          <p className="text-center text-muted">No doctor block configured.</p>
        )}
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template doctors`,
  };
}
