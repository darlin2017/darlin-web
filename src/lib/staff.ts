import { client, type MicroCMSImage } from './microcms';

export type StaffMemberData = {
  id: string;
  data: {
    name: string;
    salon: string[];
    position: string;
    instagram: string;
    photos: MicroCMSImage[];
  };
};

type StaffResponse = {
  id: string;
  name: string;
  salon: string[];
  position: string;
  instagram: string;
  photos: MicroCMSImage[];
};

// Normalizes salon values so 'feel-like-makin-love', "feel like makin' love", and 'darlin.'
// all compare equal, regardless of which format the microCMS select field actually stores.
export function normalizeSalon(value: string): string {
  return value
    .toLowerCase()
    .replace(/[.''’]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function memberBelongsToSalon(member: StaffMemberData, storeId: string): boolean {
  const target = normalizeSalon(storeId);
  return member.data.salon.some((s) => normalizeSalon(s) === target);
}

export async function getStaffList(): Promise<StaffMemberData[]> {
  const { contents } = await client.getList<StaffResponse>({
    endpoint: 'staff',
    queries: { limit: 100, orders: 'sortOrder' },
  });

  return contents.map((member) => ({
    id: member.id,
    data: {
      name: member.name,
      salon: member.salon,
      position: member.position,
      instagram: member.instagram,
      photos: member.photos,
    },
  }));
}
