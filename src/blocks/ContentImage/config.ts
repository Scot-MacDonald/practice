import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

const ContentImageBlock: Block = {
  slug: "contentImage",
  interfaceName: "ContentImageBlock",
  labels: {
    singular: "Content w/ Image",
    plural: "Content w/ Image",
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      label: "Title",
    },
    {
      name: "richText",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "mediaPosition",
      type: "select",
      defaultValue: "right",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default ContentImageBlock;
