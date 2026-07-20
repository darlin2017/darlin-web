import { createClient } from 'microcms-js-sdk';

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error('MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY must be set in .env');
}

export const client = createClient({ serviceDomain, apiKey });

export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

// microCMS's image delivery API resizes/re-encodes on the fly via query params
// (https://document.microcms.io/manual/image-api), so we can ship right-sized WebP
// instead of full camera-resolution source files.
export function optimizeImageUrl(url: string, width: number): string {
  return `${url}?w=${width}&fm=webp`;
}

// Rewrites <img> src attributes inside microCMS rich-text HTML (blog content, event
// descriptions) to request a resized/WebP version, since those URLs are baked into
// the HTML string itself and can't be touched at the template level.
export function optimizeContentImages(html: string, width: number): string {
  return html.replace(
    /(src=")(https:\/\/images\.microcms-assets\.io\/[^"?]*)(\?[^"]*)?(")/g,
    (_match, prefix, url, _existingQuery, suffix) => `${prefix}${optimizeImageUrl(url, width)}${suffix}`
  );
}
