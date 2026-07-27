import { client, type MicroCMSImage } from './microcms';

export type HomeGallery = {
  id: string;
  galleryImages: MicroCMSImage[];
};

export async function getHomeGalleries(): Promise<HomeGallery[]> {
  const { contents } = await client.getList<HomeGallery>({
    endpoint: 'home',
    queries: { limit: 100 },
  });

  return contents;
}
