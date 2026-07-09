import { client, type MicroCMSImage } from './microcms';

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

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatEventDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekday = WEEKDAYS[date.getDay()];
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
      description: event.description,
    },
  }));
}
