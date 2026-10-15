import { PlatformConfig } from '../types';

// Verified photography assets for category cards and banners
export const heroMarketplaceImg =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80';
export const catUrbanFashionImg =
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80';
export const catElectronicsImg =
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80';
export const catHomeLivingImg =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80';

export const INITIAL_CONFIG: PlatformConfig = {
  commissionRatePercent: 3.0,
  minWithdrawalAmount: 5000,
  currencySymbol: '₦',
  currencyCode: 'NGN',
  autoApproveProducts: true,
  prohibitedKeywords: [
    'weapon',
    'explosive',
    'narcotic',
    'counterfeit pass',
    'stolen card',
    'ammunition',
    'unregulated chemical',
  ],
};

export const CATEGORIES_LIST = [
  {
    name: 'Fashion',
    slug: 'fashion',
    count: 0,
    icon: 'Shirt',
    image: catUrbanFashionImg,
    description: 'Contemporary clothing, footwear, bespoke tailoring, and modern streetwear.',
  },
  {
    name: 'Phones & Gadgets',
    slug: 'phones',
    count: 0,
    icon: 'Smartphone',
    image: catElectronicsImg,
    description: 'Flagship smartphones, smartwatches, earbuds, tablets, and mobile accessories.',
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    count: 0,
    icon: 'Tv',
    image: heroMarketplaceImg,
    description: 'Audio systems, smart TVs, home theaters, solar inverters, and power equipment.',
  },
  {
    name: 'Home & Living',
    slug: 'home-living',
    count: 0,
    icon: 'Home',
    image: catHomeLivingImg,
    description: 'Sculptural furniture, artisanal tableware, bedding, and handcrafted decor.',
  },
  {
    name: 'Beauty & Fragrance',
    slug: 'beauty',
    count: 0,
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
    description: 'Niche perfumes, skincare essentials, clean makeup, and organic haircare.',
  },
  {
    name: 'Groceries & Provisions',
    slug: 'groceries',
    count: 0,
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    description: 'Fresh produce, specialty pantry goods, beverages, and bulk provisions.',
  },
  {
    name: 'Sports & Fitness',
    slug: 'sports',
    count: 0,
    icon: 'Dumbbell',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    description: 'Performance activewear, training equipment, supplements, and recovery gear.',
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    count: 0,
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
    description: 'Car care accessories, diagnostic tools, dashcams, and OEM replacement parts.',
  },
  {
    name: 'Books & Stationery',
    slug: 'books',
    count: 0,
    icon: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=80',
    description: 'African literature, academic textbooks, planners, and premium desk tools.',
  },
  {
    name: 'Kids & Toys',
    slug: 'kids',
    count: 0,
    icon: 'Baby',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80',
    description: 'STEM learning toys, comfortable babywear, games, and nursery gear.',
  },
];

export const KNOWN_DEMO_STORE_IDS = [
  'store-1',
  'store-2',
  'store-3',
  'store-4',
  'store-5',
  'store-demo-1',
  'store-demo-2',
  'store-demo-3',
];

export const KNOWN_DEMO_PRODUCT_IDS = [
  'prod-1',
  'prod-2',
  'prod-3',
  'prod-4',
  'prod-5',
  'prod-6',
  'prod-7',
  'prod-8',
  'prod-9',
  'prod-10',
  'prod-demo-1',
  'prod-demo-2',
  'prod-demo-3',
];

export const KNOWN_DEMO_USER_IDS = [
  'user-buyer-1',
  'user-seller-1',
  'user-seller-2',
  'user-admin-1',
  'user-guest',
];
