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
          name: "type", // 👈 New field
          type: "select",
          required: true,
          options: [
            { label: "U-Bahn", value: "u-bahn" },
            { label: "S-Bahn", value: "s-bahn" },
            { label: "Bus", value: "bus" },
            { label: "Tram", value: "tram" },
            { label: "Other", value: "other" },
          ],
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
    {
      name: "fourthIconUrl",
      type: "text",
    },
    {
      name: "fifthIconUrl",
      type: "text",
    },
    {
      name: "sixthIconUrl",
      type: "text",
    },
    {
      name: "seventhIconUrl",
      type: "text",
    },
  ],
};
