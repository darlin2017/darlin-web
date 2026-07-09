import { client } from './microcms';

export const CATEGORY_ORDER = [
  'Cut',
  'Single Color',
  'Double Process Color',
  'Perm',
  'Treatment',
  'Other',
] as const;

export type MenuItemData = {
  id: string;
  data: {
    category: string[];
    menuName: string;
    price: string;
    note?: string[];
    sortOrder: number;
  };
};

type MenuResponse = {
  id: string;
  category: string[];
  menuName: string;
  price: string;
  note?: string;
  sortOrder: number;
};

export async function getMenuItems(): Promise<MenuItemData[]> {
  const { contents } = await client.getList<MenuResponse>({
    endpoint: 'menu',
    queries: { limit: 100, orders: 'sortOrder' },
  });

  return contents.map((item) => ({
    id: item.id,
    data: {
      category: item.category,
      menuName: item.menuName,
      price: item.price,
      note: item.note ? item.note.split('\n').filter(Boolean) : undefined,
      sortOrder: item.sortOrder,
    },
  }));
}

export function groupMenuByCategory(items: MenuItemData[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: items
      .filter((item) => item.data.category.includes(category))
      .sort((a, b) => a.data.sortOrder - b.data.sortOrder),
  })).filter((group) => group.items.length > 0);
}
