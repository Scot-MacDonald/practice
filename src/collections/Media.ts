import type { CollectionConfig } from "payload";

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",

  access: {
    create: () => true,
    update: () => true,
    delete: () => true,
    read: () => true,
  },

  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "caption",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ],

  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
    mimeTypes: ["image/*", "image/svg+xml", "application/xml"],
  },

  hooks: {
    beforeOperation: [
      async ({ operation, req }) => {
        if (operation !== "create" && operation !== "update") return;

        const file = req?.file;
        if (!file || !file.tempFilePath) return;

        const originalName = file.name; // ✅ use 'name' instead of 'originalname'
        const ext = path.extname(originalName);
        const base = path.basename(originalName, ext);
        const timestamp = Date.now();
        const newFilename = `${base}-${timestamp}${ext}`;

        const newPath = path.join(path.dirname(file.tempFilePath), newFilename);

        try {
          // Rename the temporary file
          await fs.promises.rename(file.tempFilePath, newPath);

          // Update Payload file object
          file.name = newFilename; // original name
          file.tempFilePath = newPath; // new path on disk
        } catch (err) {
          console.error("[Media Rename Hook Error]", err);
        }

        return req;
      },
    ],
  },
};
