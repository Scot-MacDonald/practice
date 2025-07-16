import type { Block, Field } from "payload";
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from "@payloadcms/richtext-lexical";

export const NewsAndHours: Block = {
  slug: "newsAndHours",
  interfaceName: "NewsAndHoursBlock",
  fields: [
    {
      name: "news",
      type: "array",
      required: true,
      minRows: 2,
      maxRows: 2,
      fields: [
        {
          name: "date", // rename to `date` if you want clarity
          label: "Date",
          type: "date", // changed from "text"
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayOnly", // optional: only show day
            },
          },
        },
        {
          name: "summary",
          type: "textarea",
        },
        {
          name: "link",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "openingHours",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          required: false,
          defaultValue: "Opening Hours",
        },
        {
          name: "hours",
          type: "array",
          required: true,
          localized: true,
          fields: [
            {
              name: "dayKey",
              label: "Day",
              type: "select",
              required: true,
              options: [
                { label: { en: "Monday", de: "Montag" }, value: "monday" },
                { label: { en: "Tuesday", de: "Dienstag" }, value: "tuesday" },
                {
                  label: { en: "Wednesday", de: "Mittwoch" },
                  value: "wednesday",
                },
                {
                  label: { en: "Thursday", de: "Donnerstag" },
                  value: "thursday",
                },
                { label: { en: "Friday", de: "Freitag" }, value: "friday" },
                { label: { en: "Saturday", de: "Samstag" }, value: "saturday" },
                { label: { en: "Sunday", de: "Sonntag" }, value: "sunday" },
              ],
            },
            {
              name: "morning",
              label: "Morning (e.g. 08:00 - 13:00)",
              type: "text",
              required: false,
            },
            {
              name: "afternoon",
              label: "Afternoon (e.g. 14:30 - 18:00)",
              type: "text",
              required: false,
            },
          ],
        },
      ],
    },
  ],
};
