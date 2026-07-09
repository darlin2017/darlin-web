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
