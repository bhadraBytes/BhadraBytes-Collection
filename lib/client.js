import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: process.env.NEXT_PUBLIC_SANITY_IGNORE_BROWSER_TOKEN_WARNING === 'true',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);