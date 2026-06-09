export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: string;
  categorySlug: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  specs: { label: string; value: string }[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Review {
  id: number;
  productId: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  location: string;
}

export interface Order {
  id: string;
  date: string;
  items: { product: Product; quantity: number; size: string; color: string }[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  shippingAddress: {
    name: string;
    phone: string;
    division: string;
    district: string;
    address: string;
    postalCode?: string;
  };
}

export interface User {
  name: string;
  email: string;
  phone: string;
  token: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}
