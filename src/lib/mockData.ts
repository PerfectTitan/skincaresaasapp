import {
  SkincareRoutine,
  Product,
  ProductCategory,
  SkinType,
  SkinConcern,
  Budget,
  RoutineStep,
  Frequency,
} from "@/types";

interface GenerateRoutineParams {
  userId: string;
  skinProfileId: string;
  skinType: SkinType;
  skinConcerns: SkinConcern[];
  budget: Budget;
}

// Mock product database
const mockProducts: Record<ProductCategory, Product[]> = {
  [ProductCategory.CLEANSER]: [
    {
      id: "c1",
      name: "Gentle Foaming Cleanser",
      brand: "CeraVe",
      category: ProductCategory.CLEANSER,
      description:
        "Gentle foaming cleanser that removes excess oil without disrupting the skin barrier.",
      price: 14.99,
      imageUrl:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80",
      affiliateLink: "https://example.com/product/c1",
      suitableFor: [SkinType.NORMAL, SkinType.COMBINATION, SkinType.OILY],
      addressesConcerns: [SkinConcern.ACNE, SkinConcern.OILINESS],
    },
    {
      id: "c2",
      name: "Hydrating Facial Cleanser",
      brand: "CeraVe",
      category: ProductCategory.CLEANSER,
      description:
        "Hydrating cleanser with ceramides and hyaluronic acid to maintain moisture.",
      price: 15.99,
      imageUrl:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
      affiliateLink: "https://example.com/product/c2",
      suitableFor: [SkinType.DRY, SkinType.NORMAL, SkinType.SENSITIVE],
      addressesConcerns: [SkinConcern.DRYNESS, SkinConcern.SENSITIVITY],
    },
    {
      id: "c3",
      name: "Soothing Gel Cleanser",
      brand: "La Roche-Posay",
      category: ProductCategory.CLEANSER,
      description: "Gentle gel cleanser that soothes and calms irritated skin.",
      price: 24.99,
      imageUrl:
        "https://images.unsplash.com/photo-1570194065650-d99fb4ee0e57?w=300&q=80",
      affiliateLink: "https://example.com/product/c3",
      suitableFor: [SkinType.SENSITIVE, SkinType.COMBINATION],
      addressesConcerns: [SkinConcern.REDNESS, SkinConcern.SENSITIVITY],
    },
  ],
  [ProductCategory.TONER]: [
    {
      id: "t1",
      name: "Hydrating Toner",
      brand: "Klairs",
      category: ProductCategory.TONER,
      description:
        "Alcohol-free toner that hydrates and prepares skin for the next steps.",
      price: 19.99,
      imageUrl:
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&q=80",
      affiliateLink: "https://example.com/product/t1",
      suitableFor: [SkinType.DRY, SkinType.NORMAL, SkinType.SENSITIVE],
      addressesConcerns: [SkinConcern.DRYNESS, SkinConcern.DULLNESS],
    },
    {
      id: "t2",
      name: "BHA Liquid Exfoliant",
      brand: "Paula's Choice",
      category: ProductCategory.TONER,
      description:
        "Chemical exfoliant that unclogs pores and smooths skin texture.",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&q=80",
      affiliateLink: "https://example.com/product/t2",
      suitableFor: [SkinType.OILY, SkinType.COMBINATION],
      addressesConcerns: [SkinConcern.ACNE, SkinConcern.TEXTURE],
    },
  ],
  [ProductCategory.SERUM]: [
    {
      id: "s1",
      name: "Hyaluronic Acid Serum",
      brand: "The Ordinary",
      category: ProductCategory.SERUM,
      description: "Hydrating serum that plumps skin and reduces fine lines.",
      price: 7.99,
      imageUrl:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
      affiliateLink: "https://example.com/product/s1",
      suitableFor: [
        SkinType.DRY,
        SkinType.NORMAL,
        SkinType.COMBINATION,
        SkinType.SENSITIVE,
      ],
      addressesConcerns: [SkinConcern.DRYNESS, SkinConcern.AGING],
    },
    {
      id: "s2",
      name: "Niacinamide 10% + Zinc 1%",
      brand: "The Ordinary",
      category: ProductCategory.SERUM,
      description:
        "Serum that reduces sebum production and improves skin texture.",
      price: 5.99,
      imageUrl:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
      affiliateLink: "https://example.com/product/s2",
      suitableFor: [SkinType.OILY, SkinType.COMBINATION],
      addressesConcerns: [
        SkinConcern.ACNE,
        SkinConcern.OILINESS,
        SkinConcern.TEXTURE,
      ],
    },
    {
      id: "s3",
      name: "Vitamin C Serum",
      brand: "SkinCeuticals",
      category: ProductCategory.SERUM,
      description:
        "Antioxidant serum that brightens skin and protects against environmental damage.",
      price: 169.99,
      imageUrl:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
      affiliateLink: "https://example.com/product/s3",
      suitableFor: [SkinType.NORMAL, SkinType.COMBINATION, SkinType.DRY],
      addressesConcerns: [
        SkinConcern.DULLNESS,
        SkinConcern.HYPERPIGMENTATION,
        SkinConcern.AGING,
      ],
    },
  ],
  [ProductCategory.MOISTURIZER]: [
    {
      id: "m1",
      name: "Daily Moisturizing Lotion",
      brand: "CeraVe",
      category: ProductCategory.MOISTURIZER,
      description:
        "Lightweight moisturizer with ceramides and hyaluronic acid.",
      price: 13.99,
      imageUrl:
        "https://images.unsplash.com/photo-1593560368921-892072b8d81c?w=300&q=80",
      affiliateLink: "https://example.com/product/m1",
      suitableFor: [SkinType.NORMAL, SkinType.COMBINATION, SkinType.OILY],
      addressesConcerns: [SkinConcern.DRYNESS],
    },
    {
      id: "m2",
      name: "Moisturizing Cream",
      brand: "CeraVe",
      category: ProductCategory.MOISTURIZER,
      description: "Rich cream that provides 24-hour hydration for dry skin.",
      price: 16.99,
      imageUrl:
        "https://images.unsplash.com/photo-1593560368921-892072b8d81c?w=300&q=80",
      affiliateLink: "https://example.com/product/m2",
      suitableFor: [SkinType.DRY, SkinType.SENSITIVE],
      addressesConcerns: [SkinConcern.DRYNESS, SkinConcern.SENSITIVITY],
    },
    {
      id: "m3",
      name: "Oil-Free Moisturizer",
      brand: "Neutrogena",
      category: ProductCategory.MOISTURIZER,
      description: "Lightweight, oil-free moisturizer that won't clog pores.",
      price: 11.99,
      imageUrl:
        "https://images.unsplash.com/photo-1593560368921-892072b8d81c?w=300&q=80",
      affiliateLink: "https://example.com/product/m3",
      suitableFor: [SkinType.OILY, SkinType.COMBINATION],
      addressesConcerns: [SkinConcern.ACNE, SkinConcern.OILINESS],
    },
  ],
  [ProductCategory.SUNSCREEN]: [
    {
      id: "ss1",
      name: "Ultra-Light Daily UV Defense SPF 50",
      brand: "Kiehl's",
      category: ProductCategory.SUNSCREEN,
      description:
        "Lightweight sunscreen that protects against UVA and UVB rays.",
      price: 39.99,
      imageUrl:
        "https://images.unsplash.com/photo-1556228841-a3d3b069c2c8?w=300&q=80",
      affiliateLink: "https://example.com/product/ss1",
      suitableFor: [SkinType.NORMAL, SkinType.COMBINATION, SkinType.OILY],
      addressesConcerns: [SkinConcern.AGING, SkinConcern.HYPERPIGMENTATION],
    },
    {
      id: "ss2",
      name: "Mineral Sunscreen SPF 30",
      brand: "La Roche-Posay",
      category: ProductCategory.SUNSCREEN,
      description: "Mineral sunscreen suitable for sensitive skin.",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1556228841-a3d3b069c2c8?w=300&q=80",
      affiliateLink: "https://example.com/product/ss2",
      suitableFor: [SkinType.SENSITIVE, SkinType.DRY],
      addressesConcerns: [SkinConcern.SENSITIVITY, SkinConcern.REDNESS],
    },
  ],
  [ProductCategory.MASK]: [
    {
      id: "ma1",
      name: "Hydrating Overnight Mask",
      brand: "Laneige",
      category: ProductCategory.MASK,
      description: "Overnight mask that deeply hydrates and plumps skin.",
      price: 25.99,
      imageUrl:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
      affiliateLink: "https://example.com/product/ma1",
      suitableFor: [SkinType.DRY, SkinType.NORMAL, SkinType.COMBINATION],
      addressesConcerns: [SkinConcern.DRYNESS, SkinConcern.DULLNESS],
    },
    {
      id: "ma2",
      name: "Clay Mask",
      brand: "Aztec Secret",
      category: ProductCategory.MASK,
      description: "Deep cleansing clay mask that draws out impurities.",
      price: 9.99,
      imageUrl:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
      affiliateLink: "https://example.com/product/ma2",
      suitableFor: [SkinType.OILY, SkinType.COMBINATION],
      addressesConcerns: [SkinConcern.ACNE, SkinConcern.OILINESS],
    },
  ],
  [ProductCategory.EXFOLIATOR]: [
    {
      id: "e1",
      name: "AHA 30% + BHA 2% Peeling Solution",
      brand: "The Ordinary",
      category: ProductCategory.EXFOLIATOR,
      description:
        "Chemical exfoliant that improves skin texture and brightness.",
      price: 7.99,
      imageUrl:
        "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&q=80",
      affiliateLink: "https://example.com/product/e1",
      suitableFor: [SkinType.NORMAL, SkinType.COMBINATION, SkinType.OILY],
      addressesConcerns: [
        SkinConcern.TEXTURE,
        SkinConcern.DULLNESS,
        SkinConcern.HYPERPIGMENTATION,
      ],
    },
    {
      id: "e2",
      name: "Gentle Exfoliating Scrub",
      brand: "Cetaphil",
      category: ProductCategory.EXFOLIATOR,
      description: "Gentle physical exfoliant suitable for sensitive skin.",
      price: 11.99,
      imageUrl:
        "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&q=80",
      affiliateLink: "https://example.com/product/e2",
      suitableFor: [SkinType.SENSITIVE, SkinType.DRY],
      addressesConcerns: [SkinConcern.TEXTURE, SkinConcern.DULLNESS],
    },
  ],
  [ProductCategory.EYE_CREAM]: [
    {
      id: "ec1",
      name: "Eye Contour Cream",
      brand: "Kiehl's",
      category: ProductCategory.EYE_CREAM,
      description:
        "Hydrating eye cream that reduces puffiness and dark circles.",
      price: 32.99,
      imageUrl:
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&q=80",
      affiliateLink: "https://example.com/product/ec1",
      suitableFor: [SkinType.NORMAL, SkinType.DRY, SkinType.COMBINATION],
      addressesConcerns: [SkinConcern.AGING, SkinConcern.DRYNESS],
    },
  ],
  [ProductCategory.TREATMENT]: [
    {
      id: "tr1",
      name: "Retinol 0.5% in Squalane",
      brand: "The Ordinary",
      category: ProductCategory.TREATMENT,
      description:
        "Retinol treatment that reduces fine lines and improves skin texture.",
      price: 5.99,
      imageUrl:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
      affiliateLink: "https://example.com/product/tr1",
      suitableFor: [SkinType.NORMAL, SkinType.COMBINATION, SkinType.OILY],
      addressesConcerns: [
        SkinConcern.AGING,
        SkinConcern.TEXTURE,
        SkinConcern.HYPERPIGMENTATION,
      ],
    },
    {
      id: "tr2",
      name: "Azelaic Acid Suspension 10%",
      brand: "The Ordinary",
      category: ProductCategory.TREATMENT,
      description: "Treatment that brightens skin tone and reduces redness.",
      price: 7.99,
      imageUrl:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
      affiliateLink: "https://example.com/product/tr2",
      suitableFor: [SkinType.SENSITIVE, SkinType.COMBINATION],
      addressesConcerns: [
        SkinConcern.REDNESS,
        SkinConcern.HYPERPIGMENTATION,
        SkinConcern.ACNE,
      ],
    },
  ],
};

// Helper function to select products based on skin type and concerns
function selectProductsForRoutine(params: GenerateRoutineParams): {
  morningRoutine: RoutineStep[];
  eveningRoutine: RoutineStep[];
  weeklyRoutine: RoutineStep[];
} {
  const { skinType, skinConcerns, budget } = params;

  // Price ranges based on budget
  const priceRanges = {
    [Budget.LOW]: { max: 20 },
    [Budget.MEDIUM]: { max: 50 },
    [Budget.HIGH]: { max: 200 },
  };

  const maxPrice = priceRanges[budget].max;

  // Filter products by skin type, concerns, and budget
  const filteredProducts = Object.entries(mockProducts).reduce(
    (acc, [category, products]) => {
      const filtered = products.filter((product) => {
        // Check if product is suitable for skin type
        const matchesSkinType = product.suitableFor.includes(skinType);

        // Check if product addresses at least one skin concern
        const matchesConcern = product.addressesConcerns.some((concern) =>
          skinConcerns.includes(concern),
        );

        // Check if product is within budget
        const withinBudget = product.price <= maxPrice;

        return matchesSkinType && matchesConcern && withinBudget;
      });

      acc[category as ProductCategory] =
        filtered.length > 0
          ? filtered
          : products.filter((p) => p.price <= maxPrice);
      return acc;
    },
    {} as Record<string, Product[]>,
  );

  // Select products for morning routine
  const morningRoutine: RoutineStep[] = [
    {
      order: 1,
      productId: getRandomProduct(filteredProducts[ProductCategory.CLEANSER])
        .id,
      product: getRandomProduct(filteredProducts[ProductCategory.CLEANSER]),
      frequency: Frequency.DAILY,
      instructions:
        "Gently massage onto damp skin and rinse with lukewarm water.",
    },
    {
      order: 2,
      productId: getRandomProduct(filteredProducts[ProductCategory.TONER]).id,
      product: getRandomProduct(filteredProducts[ProductCategory.TONER]),
      frequency: Frequency.DAILY,
      instructions: "Apply to clean skin with a cotton pad or fingertips.",
    },
    {
      order: 3,
      productId: getRandomProduct(filteredProducts[ProductCategory.SERUM]).id,
      product: getRandomProduct(filteredProducts[ProductCategory.SERUM]),
      frequency: Frequency.DAILY,
      instructions: "Apply a few drops to face and neck, gently pat into skin.",
    },
    {
      order: 4,
      productId: getRandomProduct(filteredProducts[ProductCategory.MOISTURIZER])
        .id,
      product: getRandomProduct(filteredProducts[ProductCategory.MOISTURIZER]),
      frequency: Frequency.DAILY,
      instructions: "Apply a small amount to face and neck.",
    },
    {
      order: 5,
      productId: getRandomProduct(filteredProducts[ProductCategory.SUNSCREEN])
        .id,
      product: getRandomProduct(filteredProducts[ProductCategory.SUNSCREEN]),
      frequency: Frequency.DAILY,
      instructions:
        "Apply generously to face and neck as the final step of your morning routine.",
    },
  ];

  // Select products for evening routine
  const eveningRoutine: RoutineStep[] = [
    {
      order: 1,
      productId: getRandomProduct(filteredProducts[ProductCategory.CLEANSER])
        .id,
      product: getRandomProduct(filteredProducts[ProductCategory.CLEANSER]),
      frequency: Frequency.DAILY,
      instructions:
        "Gently massage onto damp skin and rinse with lukewarm water.",
    },
    {
      order: 2,
      productId: getRandomProduct(filteredProducts[ProductCategory.TONER]).id,
      product: getRandomProduct(filteredProducts[ProductCategory.TONER]),
      frequency: Frequency.DAILY,
      instructions: "Apply to clean skin with a cotton pad or fingertips.",
    },
    {
      order: 3,
      productId: getRandomProduct(filteredProducts[ProductCategory.SERUM]).id,
      product: getRandomProduct(filteredProducts[ProductCategory.SERUM]),
      frequency: Frequency.DAILY,
      instructions: "Apply a few drops to face and neck, gently pat into skin.",
    },
    {
      order: 4,
      productId: getRandomProduct(filteredProducts[ProductCategory.TREATMENT])
        .id,
      product: getRandomProduct(filteredProducts[ProductCategory.TREATMENT]),
      frequency: Frequency.DAILY,
      instructions:
        "Apply a small amount to face and neck, avoiding the eye area.",
    },
    {
      order: 5,
      productId: getRandomProduct(filteredProducts[ProductCategory.MOISTURIZER])
        .id,
      product: getRandomProduct(filteredProducts[ProductCategory.MOISTURIZER]),
      frequency: Frequency.DAILY,
      instructions: "Apply a small amount to face and neck.",
    },
    {
      order: 6,
      productId: getRandomProduct(filteredProducts[ProductCategory.EYE_CREAM])
        .id,
      product: getRandomProduct(filteredProducts[ProductCategory.EYE_CREAM]),
      frequency: Frequency.DAILY,
      instructions:
        "Gently pat a small amount around the eye area using your ring finger.",
    },
  ];

  // Select products for weekly routine
  const weeklyRoutine: RoutineStep[] = [
    {
      order: 1,
      productId: getRandomProduct(filteredProducts[ProductCategory.EXFOLIATOR])
        .id,
      product: getRandomProduct(filteredProducts[ProductCategory.EXFOLIATOR]),
      frequency: Frequency.WEEKLY,
      instructions:
        "Use 1-2 times per week after cleansing. Avoid using with other active ingredients.",
    },
    {
      order: 2,
      productId: getRandomProduct(filteredProducts[ProductCategory.MASK]).id,
      product: getRandomProduct(filteredProducts[ProductCategory.MASK]),
      frequency: Frequency.WEEKLY,
      instructions:
        "Apply a thin layer to clean skin. Leave on for 10-15 minutes, then rinse off.",
    },
  ];

  return { morningRoutine, eveningRoutine, weeklyRoutine };
}

// Helper function to get a random product from an array
function getRandomProduct(products: Product[]): Product {
  return products[Math.floor(Math.random() * products.length)];
}

// Generate a mock skincare routine
export function generateMockRoutine(
  params: GenerateRoutineParams,
): SkincareRoutine {
  const { userId, skinProfileId } = params;
  const { morningRoutine, eveningRoutine, weeklyRoutine } =
    selectProductsForRoutine(params);

  return {
    id: `routine-${Date.now()}`,
    userId: userId,
    skinProfileId: skinProfileId,
    morningRoutine: morningRoutine,
    eveningRoutine: eveningRoutine,
    weeklyRoutine: weeklyRoutine,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
