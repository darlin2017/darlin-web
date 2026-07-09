import { client, type MicroCMSImage } from './microcms';

export type HomeGallery = {
  id: string;
  galleryImages: MicroCMSImage[];
};

// Data-fetching only for now — no page currently renders this.
export async function getHomeGalleries(): Promise<HomeGallery[]> {
  const { contents } = await client.getList<HomeGallery>({
    endpoint: 'home',
    queries: { limit: 100 },
  });

  return contents;
}
