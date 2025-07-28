import type { Metadata } from "next";
import type { Page, Post } from "../payload-types";
import { mergeOpenGraph } from "./mergeOpenGraph";

export const generateMeta = async (args: {
  doc: Page | Post;
}): Promise<Metadata> => {
  const { doc } = args || {};

  const ogImage =
    typeof doc?.meta?.image === "object" &&
    doc.meta.image !== null &&
    "url" in doc.meta.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`;

  const title = doc?.meta?.title
    ? `${doc.meta.title} | Payload Website Template`
    : "Payload Website Template";

  // ✅ Safe check for optional 'keywords' field
  const keywords =
    doc?.meta && "keywords" in doc.meta && typeof doc.meta.keywords === "string"
      ? doc.meta.keywords.split(",").map((kw) => kw.trim())
      : undefined;

  return {
    title,
    description: doc?.meta?.description,
    keywords, // ✅ Pass the safely parsed keywords
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || "",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc.slug.join("/") : "/",
    }),
  };
};
