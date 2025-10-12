import { faker } from '@faker-js/faker';
import slugify from 'slugify';

/**
 * Generate a URL-safe slug from a string
 */
export function generateSlug(text: string): string {
  return slugify(text, { lower: true, strict: true });
}

/**
 * Pick a random element from an array
 */
export function randomElement<T>(array: T[]): T {
  return faker.helpers.arrayElement(array);
}

/**
 * Pick multiple random elements from an array
 */
export function randomElements<T>(array: T[], count: number): T[] {
  return faker.helpers.arrayElements(array, count);
}

/**
 * Generate a random number between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return faker.number.int({ min, max });
}

/**
 * Generate a random float between min and max
 */
export function randomFloat(min: number, max: number, precision = 2): number {
  return faker.number.float({ min, max, fractionDigits: precision });
}

/**
 * Generate a random boolean with optional weight (0-1)
 */
export function randomBoolean(weight = 0.5): boolean {
  return faker.datatype.boolean({ probability: weight });
}

/**
 * Generate a random date between two dates
 */
export function randomDate(start: Date, end: Date): Date {
  return faker.date.between({ from: start, to: end });
}

/**
 * Generate a random past date within N years
 */
export function randomPastDate(years: number): Date {
  return faker.date.past({ years });
}

/**
 * Generate a random future date within N years
 */
export function randomFutureDate(years: number): Date {
  return faker.date.future({ years });
}

/**
 * Generate unique slugs within a context
 */
export class SlugGenerator {
  private usedSlugs = new Set<string>();

  generateUnique(text: string): string {
    let slug = generateSlug(text);
    let counter = 1;

    while (this.usedSlugs.has(slug)) {
      slug = `${generateSlug(text)}-${counter}`;
      counter++;
    }

    this.usedSlugs.add(slug);
    return slug;
  }

  reset(): void {
    this.usedSlugs.clear();
  }
}

/**
 * Vehicle-specific data generators
 */
export const vehicleData = {
  brands: [
    'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota',
    'Honda', 'Ford', 'Porsche', 'Tesla', 'Nissan',
    'Mazda', 'Hyundai', 'Kia', 'Volvo', 'Škoda',
  ],

  modelSuffixes: ['Series', 'Class', 'Line', 'GT', 'Sport', 'Comfort', 'Premium'],

  generationYears: () => {
    const startYear = faker.number.int({ min: 2015, max: 2022 });
    const endYear = faker.helpers.maybe(() =>
      faker.number.int({ min: startYear + 1, max: 2025 }),
      { probability: 0.7 }
    );
    return { startYear, endYear };
  },

  colors: {
    exterior: [
      { name: 'Pearl White', hex: '#F5F5F5' },
      { name: 'Jet Black', hex: '#0A0A0A' },
      { name: 'Metallic Silver', hex: '#C0C0C0' },
      { name: 'Deep Blue', hex: '#1E3A8A' },
      { name: 'Racing Red', hex: '#DC2626' },
      { name: 'Graphite Gray', hex: '#6B7280' },
      { name: 'Midnight Blue', hex: '#1E293B' },
      { name: 'Alpine White', hex: '#FFFFFF' },
      { name: 'Obsidian Black', hex: '#000000' },
      { name: 'Steel Blue', hex: '#4682B4' },
    ],
    interior: [
      { name: 'Black Leather', hex: '#1A1A1A' },
      { name: 'Beige Leather', hex: '#F5F5DC' },
      { name: 'Brown Leather', hex: '#8B4513' },
      { name: 'Gray Fabric', hex: '#808080' },
      { name: 'Red Leather', hex: '#B91C1C' },
      { name: 'Tan Leather', hex: '#D2691E' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Cream', hex: '#FFFDD0' },
    ],
  },

  equipment: [
    'Navigation System',
    'Panoramic Sunroof',
    'Leather Seats',
    'Heated Seats',
    'Parking Sensors',
    'Backup Camera',
    'Cruise Control',
    'Bluetooth Connectivity',
    'Premium Sound System',
    'Alloy Wheels',
    'LED Headlights',
    'Keyless Entry',
    'Power Liftgate',
    'Roof Rack',
    'Tow Bar',
    'Independent Heating',
    'Sport Package',
    'Winter Package',
  ],
};

/**
 * Leasing company names
 */
export const leasingCompanies = [
  'AutoLease Pro',
  'FleetMaster Leasing',
  'DriveNow Finance',
  'Prime Vehicle Leasing',
  'CarFlex Solutions',
  'Mobility Lease Group',
  'VehiclePartner Leasing',
  'Enterprise Fleet',
  'LeasePlan International',
  'ALD Automotive',
];

/**
 * Generate realistic vehicle descriptions
 */
export function generateVehicleDescription(): string {
  const features = [
    'advanced safety features',
    'premium interior design',
    'cutting-edge technology',
    'exceptional fuel efficiency',
    'powerful performance',
    'spacious cabin',
    'luxurious comfort',
    'innovative engineering',
  ];

  const selectedFeatures = randomElements(features, randomInt(2, 4));

  return `Experience ${selectedFeatures.join(', ')}. ${faker.company.catchPhrase()}.`;
}

/**
 * Generate realistic company descriptions
 */
export function generateCompanyDescription(): string {
  return faker.company.catchPhrase();
}
