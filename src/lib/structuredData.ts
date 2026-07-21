const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Maps the free-text labels used in stores.json's `hours` field (e.g. "Weekdays  11:00 - 19:00")
// to the schema.org day-of-week list that OpeningHoursSpecification expects.
const DAY_GROUPS: Record<string, string[]> = {
  weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  'sat/sun': ['Saturday', 'Sunday'],
};

type OpeningHoursSpecification = {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

function parseOpeningHours(hours: string): OpeningHoursSpecification[] {
  return hours
    .split('\n')
    .map((line) => line.trim())
    .map((line) => {
      const match = line.match(/^(.*?)\s*(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/);
      if (!match) return null;

      const [, label, opens, closes] = match;
      const dayOfWeek = DAY_GROUPS[label.trim().toLowerCase()] ?? ALL_DAYS;

      return { '@type': 'OpeningHoursSpecification' as const, dayOfWeek, opens, closes };
    })
    .filter((spec): spec is OpeningHoursSpecification => spec !== null);
}

export type StoreForSchema = {
  storeName: string;
  address: string;
  postalCode: string;
  phone: string;
  hours: string;
  mapUrl: string;
};

// stores.json's `hours` doesn't capture irregular closures ("不定休" = closed on
// no fixed weekday), so those simply aren't represented here — schema.org has no
// clean way to express "closed sometimes, unpredictably".
export function buildHairSalonSchema(store: StoreForSchema, pageUrl: string, imageUrl: string, anchorId: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': `${pageUrl}#${anchorId}`,
    name: store.storeName,
    image: imageUrl,
    telephone: store.phone,
    url: pageUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address,
      postalCode: store.postalCode,
      addressCountry: 'JP',
    },
    hasMap: store.mapUrl,
    openingHoursSpecification: parseOpeningHours(store.hours),
  };
}
