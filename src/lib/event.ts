import { client, fixContentImageAlts, optimizeContentImages, type MicroCMSImage } from './microcms';
import { getJSTParts } from './date';

export type EventItemData = {
  id: string;
  data: {
    title: string;
    eventDate: Date;
    flyer: MicroCMSImage[];
    description: string;
  };
};

type EventResponse = {
  id: string;
  title: string;
  eventDate: string;
  flyer: MicroCMSImage[];
  description: string;
};

export function formatEventDate(date: Date): string {
  const { year, month, day, weekday } = getJSTParts(date);
  return `${year} ${month}/${day} (${weekday})`;
}

export async function getEvents(): Promise<EventItemData[]> {
  const { contents } = await client.getList<EventResponse>({
    endpoint: 'event',
    queries: { limit: 100, orders: '-eventDate' },
  });

  return contents.map((event) => ({
    id: event.id,
    data: {
      title: event.title,
      eventDate: new Date(event.eventDate),
      flyer: event.flyer ?? [],
      description: fixContentImageAlts(optimizeContentImages(event.description ?? '', 800), event.title),
    },
  }));
}
