import type { CollectionConfig } from "payload";
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
    },
    {
      name: "version",
      type: "number",
      admin: {
        readOnly: true,
      },
      defaultValue: Date.now(),
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
    mimeTypes: ["image/*", "image/svg+xml", "application/xml"],
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (!doc?.id || !req?.payload) return;

        const newVersion = Date.now();

        // ✅ Update version field to force cache-busting
        await req.payload.update({
          collection: "media",
          id: doc.id,
          data: { version: newVersion } as any,
          overrideAccess: true,
        });
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (!doc?.filename) return;

        const filePath = path.join(
          path.resolve(dirname, "../../public/media"),
          doc.filename
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`[Media] Deleted file from disk: ${doc.filename}`);
        }
      },
    ],
  },
};
