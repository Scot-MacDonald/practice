// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { searchPlugin } from "@payloadcms/plugin-search";
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import sharp from "sharp"; // editor-import
import { UnderlineFeature } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import Categories from "./collections/Categories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Doctors } from "./collections/Doctors";
import Users from "./collections/Users";

import { Footer } from "./globals/Footer/config";
import { Header } from "./globals/Header/config";
import { revalidateRedirects } from "./hooks/revalidateRedirects";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Page, Post } from "src/payload-types";

import { searchFields } from "@/search/fieldOverrides";
import { beforeSyncWithSearch } from "@/search/beforeSync";
import localization from "./i18n/localization";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";

import { resendAdapter } from "@payloadcms/email-resend";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Payload Website Template`
    : "Payload Website Template";
};

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL!;
};

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  editor: lexicalEditor({
    features: () => [
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({
        enabledCollections: ["pages", "posts", "doctors"],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter(
            (field) => !("name" in field && field.name === "url")
          );
          return [
            ...defaultFieldsWithoutUrl,
            {
              name: "url",
              type: "text",
              admin: {
                condition: ({ linkType }) => linkType !== "internal",
              },
              label: ({ t }) => t("fields:enterURL"),
              required: true,
            },
          ];
        },
      }),
    ],
  }),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  collections: [Pages, Posts, Media, Categories, Users, Doctors],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    redirectsPlugin({
      collections: ["pages", "posts", "doctors"],
      overrides: {
        fields: ({ defaultFields }) =>
          defaultFields.map((field) => {
            if (
              "name" in field &&
              "type" in field &&
              field.name === "from" &&
              field.type === "text"
            ) {
              return {
                ...field,
                admin: {
                  ...field.admin,
                  description:
                    "You will need to rebuild the website when changing this field.",
                },
              };
            }
            return field;
          }),
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    nestedDocsPlugin({
      collections: ["categories"],
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN || "",
      },
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) =>
          defaultFields.map((field) => {
            if ("name" in field && field.name === "confirmationMessage") {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                  ],
                }),
              };
            }
            return field;
          }),
      },
    }),
    searchPlugin({
      collections: ["posts"],
      beforeSync: beforeSyncWithSearch,
      searchOverrides: {
        fields: ({ defaultFields }) => [...defaultFields, ...searchFields],
      },
    }),
    payloadCloudPlugin(),
  ],
  localization,
  email: resendAdapter({
    defaultFromAddress:
      process.env.DEFAULT_FROM_ADDRESS || "dev@payloadcms.com",
    defaultFromName: process.env.DEFAULT_FROM_NAME || "Payload CMS",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
