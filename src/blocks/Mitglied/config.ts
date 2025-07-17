import { Block } from "payload";

export const Mitglied: Block = {
  slug: "mitglied",
  labels: {
    singular: "Mitglied Section",
    plural: "Mitglied Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "array",
          fields: [
            {
              name: "line",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
