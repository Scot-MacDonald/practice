// pages/api/preview.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug, locale } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ message: "Missing slug" });
  }

  const localePrefix = locale && typeof locale === "string" ? `/${locale}` : "";
  const previewUrl = `${localePrefix}/${slug}`;

  res.setPreviewData({});
  res.writeHead(307, { Location: previewUrl });
  res.end();
}
