import { type BrandDiscount } from './types'
import { combineDiscounts } from './types'

// Mock data for demonstration purposes
export const mockDiscountData: BrandDiscount[] = [
  {
    id: '1',
    brandName: 'BMW',
    brandSlug: 'bmw',
    discount: {
      percentage: 20,
    },
    models: [
      {
        id: '1-1',
        modelName: '3 Series',
        modelSlug: '3-series',
        discount: {
          percentage: 10,
        },
        effectiveDiscount: combineDiscounts(
          { percentage: 20 },
          { percentage: 10 }
        ),
        trims: [
          {
            id: '1-1-1',
            trimName: '320d',
            engineType: 'Diesel',
            power: '190HP',
            discount: {
              percentage: 5,
              nominal: 50000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts({ percentage: 20 }, { percentage: 10 }),
              { percentage: 5, nominal: 50000 }
            ),
          },
          {
            id: '1-1-2',
            trimName: '330i',
            engineType: 'Benzín',
            power: '258HP',
            discount: {
              percentage: 3,
              nominal: 30000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts({ percentage: 20 }, { percentage: 10 }),
              { percentage: 3, nominal: 30000 }
            ),
          },
          {
            id: '1-1-3',
            trimName: '330e',
            engineType: 'Plug-in Hybrid',
            power: '292HP',
            discount: {
              nominal: 80000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts({ percentage: 20 }, { percentage: 10 }),
              { nominal: 80000 }
            ),
          },
        ],
      },
      {
        id: '1-2',
        modelName: 'X5',
        modelSlug: 'x5',
        discount: {
          percentage: 15,
          nominal: 100000,
        },
        effectiveDiscount: combineDiscounts(
          { percentage: 20 },
          { percentage: 15, nominal: 100000 }
        ),
        trims: [
          {
            id: '1-2-1',
            trimName: 'xDrive40i',
            engineType: 'Benzín',
            power: '340HP',
            discount: {
              percentage: 2,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts(
                { percentage: 20 },
                { percentage: 15, nominal: 100000 }
              ),
              { percentage: 2 }
            ),
          },
          {
            id: '1-2-2',
            trimName: 'xDrive45e',
            engineType: 'Plug-in Hybrid',
            power: '394HP',
            discount: {
              nominal: 120000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts(
                { percentage: 20 },
                { percentage: 15, nominal: 100000 }
              ),
              { nominal: 120000 }
            ),
          },
        ],
      },
    ],
  },
  {
    id: '2',
    brandName: 'Škoda',
    brandSlug: 'skoda',
    discount: {
      percentage: 15,
    },
    models: [
      {
        id: '2-1',
        modelName: 'Octavia',
        modelSlug: 'octavia',
        discount: {
          percentage: 8,
        },
        effectiveDiscount: combineDiscounts(
          { percentage: 15 },
          { percentage: 8 }
        ),
        trims: [
          {
            id: '2-1-1',
            trimName: '2.0 TDI',
            engineType: 'Diesel',
            power: '150HP',
            discount: {
              nominal: 25000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts({ percentage: 15 }, { percentage: 8 }),
              { nominal: 25000 }
            ),
          },
          {
            id: '2-1-2',
            trimName: '1.5 TSI',
            engineType: 'Benzín',
            power: '150HP',
            discount: {
              percentage: 3,
              nominal: 20000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts({ percentage: 15 }, { percentage: 8 }),
              { percentage: 3, nominal: 20000 }
            ),
          },
        ],
      },
      {
        id: '2-2',
        modelName: 'Enyaq iV',
        modelSlug: 'enyaq-iv',
        discount: {
          percentage: 12,
          nominal: 150000,
        },
        effectiveDiscount: combineDiscounts(
          { percentage: 15 },
          { percentage: 12, nominal: 150000 }
        ),
        trims: [
          {
            id: '2-2-1',
            trimName: '60',
            engineType: 'Elektro',
            power: '180HP',
            discount: {
              nominal: 50000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts(
                { percentage: 15 },
                { percentage: 12, nominal: 150000 }
              ),
              { nominal: 50000 }
            ),
          },
          {
            id: '2-2-2',
            trimName: '80x',
            engineType: 'Elektro',
            power: '265HP',
            discount: {
              percentage: 5,
              nominal: 75000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts(
                { percentage: 15 },
                { percentage: 12, nominal: 150000 }
              ),
              { percentage: 5, nominal: 75000 }
            ),
          },
        ],
      },
    ],
  },
  {
    id: '3',
    brandName: 'Volkswagen',
    brandSlug: 'volkswagen',
    discount: {
      percentage: 18,
      nominal: 50000,
    },
    models: [
      {
        id: '3-1',
        modelName: 'Golf',
        modelSlug: 'golf',
        discount: {
          percentage: 5,
        },
        effectiveDiscount: combineDiscounts(
          { percentage: 18, nominal: 50000 },
          { percentage: 5 }
        ),
        trims: [
          {
            id: '3-1-1',
            trimName: '1.5 eTSI',
            engineType: 'Mild Hybrid',
            power: '150HP',
            discount: {
              percentage: 2,
              nominal: 15000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts(
                { percentage: 18, nominal: 50000 },
                { percentage: 5 }
              ),
              { percentage: 2, nominal: 15000 }
            ),
          },
          {
            id: '3-1-2',
            trimName: '2.0 TDI',
            engineType: 'Diesel',
            power: '150HP',
            discount: {
              nominal: 20000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts(
                { percentage: 18, nominal: 50000 },
                { percentage: 5 }
              ),
              { nominal: 20000 }
            ),
          },
        ],
      },
      {
        id: '3-2',
        modelName: 'ID.4',
        modelSlug: 'id4',
        discount: {
          percentage: 10,
          nominal: 80000,
        },
        effectiveDiscount: combineDiscounts(
          { percentage: 18, nominal: 50000 },
          { percentage: 10, nominal: 80000 }
        ),
        trims: [
          {
            id: '3-2-1',
            trimName: 'Pure',
            engineType: 'Elektro',
            power: '170HP',
            discount: {
              percentage: 3,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts(
                { percentage: 18, nominal: 50000 },
                { percentage: 10, nominal: 80000 }
              ),
              { percentage: 3 }
            ),
          },
          {
            id: '3-2-2',
            trimName: 'Pro Performance',
            engineType: 'Elektro',
            power: '204HP',
            discount: {
              percentage: 5,
              nominal: 40000,
            },
            effectiveDiscount: combineDiscounts(
              combineDiscounts(
                { percentage: 18, nominal: 50000 },
                { percentage: 10, nominal: 80000 }
              ),
              { percentage: 5, nominal: 40000 }
            ),
          },
        ],
      },
    ],
  },
  {
    id: '4',
    brandName: 'Audi',
    brandSlug: 'audi',
    discount: {
      percentage: 22,
    },
    models: [
      {
        id: '4-1',
        modelName: 'A4',
        modelSlug: 'a4',
        effectiveDiscount: { percentage: 22 },
        trims: [
          {
            id: '4-1-1',
            trimName: '40 TDI',
            engineType: 'Diesel',
            power: '204HP',
            discount: {
              percentage: 8,
              nominal: 60000,
            },
            effectiveDiscount: combineDiscounts(
              { percentage: 22 },
              { percentage: 8, nominal: 60000 }
            ),
          },
          {
            id: '4-1-2',
            trimName: '45 TFSI',
            engineType: 'Benzín',
            power: '265HP',
            discount: {
              percentage: 6,
              nominal: 45000,
            },
            effectiveDiscount: combineDiscounts(
              { percentage: 22 },
              { percentage: 6, nominal: 45000 }
            ),
          },
        ],
      },
    ],
  },
]
