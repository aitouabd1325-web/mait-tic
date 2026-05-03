export interface Store {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export interface PriceEntry {
  storeId: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  url: string;
  lastUpdated: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'smartphone' | 'laptop';
  image: string;
  description: string;
  specs: Record<string, string>;
  prices: PriceEntry[];
  rating: number;
  numReviews: number;
}

export interface FilterState {
  brands: string[];
  priceMin: number | null;
  priceMax: number | null;
  inStock: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name';
  search: string;
}
