import type { CollectionEntry } from 'astro:content';

export const CATEGORY_ORDER = [
  'Cut',
  'Single Color',
  'Double Process Color',
  'Perm',
  'Treatment',
  'Other',
] as const;

export function groupMenuByCategory(items: CollectionEntry<'menu'>[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: items
      .filter((item) => item.data.category === category)
      .sort((a, b) => a.data.sortOrder - b.data.sortOrder),
  })).filter((group) => group.items.length > 0);
}
