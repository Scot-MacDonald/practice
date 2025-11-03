import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

async function triggerRevalidate() {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return;

  const revalidateURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/next/revalidate?secret=${secret}`;

  try {
    // Use native fetch
    await fetch(revalidateURL);
    console.log("[Media] Revalidation triggered successfully");
  } catch (err) {
    console.error("[Media] Revalidation failed:", err);
  }
}

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: () => true,
    update: () => true,
    delete: () => true,
    read: () => true,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
    mimeTypes: ["image/*", "image/svg+xml", "application/xml"],
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
      name: "url",
      type: "text",
      admin: { hidden: true },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        const uploadDir = path.resolve(dirname, "../../public/media");
        if (
          originalDoc &&
          data?.filename &&
          originalDoc.filename !== data.filename
        ) {
          const oldFilePath = path.join(uploadDir, originalDoc.filename);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
            console.log(`[Media] Deleted old file: ${originalDoc.filename}`);
          }

          const ext = data.filename.split(".").pop();
          const base = data.filename.replace(/\.[^/.]+$/, "");
          const newName = `${Date.now()}-${base}.${ext}`;

          const uploadedFilePath = path.join(uploadDir, data.filename);
          const newFilePath = path.join(uploadDir, newName);

          if (fs.existsSync(uploadedFilePath)) {
            fs.renameSync(uploadedFilePath, newFilePath);
          }

          data.filename = newName;
          data.url = `/media/${newName}`;
        }
        return data;
      },
    ],
    afterChange: [
      async () => {
        await triggerRevalidate();
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (!doc?.filename) return;
        const uploadDir = path.resolve(dirname, "../../public/media");
        const filePath = path.join(uploadDir, doc.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`[Media] Deleted file on delete: ${doc.filename}`);
        }
        await triggerRevalidate();
      },
    ],
  },
};
