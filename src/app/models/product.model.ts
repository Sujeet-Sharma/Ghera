export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice: number;
  discount?: number;
  images: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  details: string[];
  careInstructions: string[];
  outOfStock: boolean;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}
