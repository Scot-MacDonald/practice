import { Block } from "payload";

export const FindUs: Block = {
  slug: "findUs",
  labels: {
    singular: "Find Us Section",
    plural: "Find Us Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "transports",
      type: "array",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "lines",
          type: "array",
          fields: [
            {
              name: "line",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "lat",
      type: "number",
      required: true,
    },
    {
      name: "lng",
      type: "number",
      required: true,
    },
    {
      name: "secondIconUrl",
      type: "text",
    },
    {
      name: "thirdIconUrl",
      type: "text",
    },
  ],
};
