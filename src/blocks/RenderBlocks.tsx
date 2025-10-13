import { cn } from "src/utilities/cn";
import React, { Fragment } from "react";

import type { Page } from "@/payload-types";

import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import MitgliedBlock from "@/blocks/Mitglied/Component";
import { TypedLocale } from "payload";
import { NewsAndHoursBlock } from "@/blocks/NewsAndHours/Component";
import FindUsBlock from "@/blocks/FindUs/Component";
import { AccordionBlock } from "@/blocks/Accordion/Component";
import { DoctorBlock } from "@/blocks/DoctorBlock/Component";
// import { DoctorHomeBlock } from "./DoctorBlock copy/Component";
import { ContentImageBlock } from "@/blocks/ContentImage/Component";
import { SliderBlock } from "@/blocks/SliderBlock/Component";

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  mitglied: MitgliedBlock,
  newsAndHours: NewsAndHoursBlock,
  findUs: FindUsBlock,
  accordion: AccordionBlock,
  doctor: DoctorBlock,
  // doctorHome: DoctorHomeBlock,
  contentImage: ContentImageBlock,
  contentSlider: SliderBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
  locale: TypedLocale;
}> = ({ blocks, locale }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block;

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType];

          return (
            <div key={index}>
              {/* @ts-expect-error */}
              <Block {...block} locale={locale} />
            </div>
          );
        }

        return null;
      })}
    </Fragment>
  );
};
