export interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  category?: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
}