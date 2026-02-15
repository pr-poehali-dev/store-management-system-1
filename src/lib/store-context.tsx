import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  reviews: Review[];
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  addProduct: (product: Omit<Product, "id" | "rating" | "reviewCount">) => void;
  deleteProduct: (id: string) => void;
  addReview: (review: Omit<Review, "id" | "date">) => void;
  placeOrder: () => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Беспроводные наушники Pro",
    price: 12990,
    oldPrice: 16990,
    image: "https://cdn.poehali.dev/projects/8b304bc3-243a-4cbe-816a-1dc07d3decdb/files/266329ea-698f-44d2-af84-1e10def144aa.jpg",
    category: "Электроника",
    description: "Премиальные беспроводные наушники с шумоподавлением и 30 часами автономной работы. Идеальный звук для музыки и звонков.",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
  },
  {
    id: "2",
    name: "Смарт-часы Ultra",
    price: 24990,
    image: "https://cdn.poehali.dev/projects/8b304bc3-243a-4cbe-816a-1dc07d3decdb/files/266329ea-698f-44d2-af84-1e10def144aa.jpg",
    category: "Электроника",
    description: "Умные часы с AMOLED-дисплеем, мониторингом здоровья и GPS. Водонепроницаемые до 50 метров.",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: "3",
    name: "Кожаная сумка Elegance",
    price: 8990,
    oldPrice: 11990,
    image: "https://cdn.poehali.dev/projects/8b304bc3-243a-4cbe-816a-1dc07d3decdb/files/266329ea-698f-44d2-af84-1e10def144aa.jpg",
    category: "Аксессуары",
    description: "Стильная кожаная сумка ручной работы из натуральной итальянской кожи. Вместительная и практичная.",
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
  },
  {
    id: "4",
    name: "Солнцезащитные очки Aviator",
    price: 5490,
    image: "https://cdn.poehali.dev/projects/8b304bc3-243a-4cbe-816a-1dc07d3decdb/files/266329ea-698f-44d2-af84-1e10def144aa.jpg",
    category: "Аксессуары",
    description: "Классические авиаторы с поляризованными линзами и титановой оправой. UV400 защита.",
    rating: 4.5,
    reviewCount: 203,
    inStock: true,
  },
  {
    id: "5",
    name: "Портативная колонка Bass",
    price: 6990,
    oldPrice: 9990,
    image: "https://cdn.poehali.dev/projects/8b304bc3-243a-4cbe-816a-1dc07d3decdb/files/266329ea-698f-44d2-af84-1e10def144aa.jpg",
    category: "Электроника",
    description: "Мощная портативная колонка с глубоким басом. Защита от воды IPX7, 20 часов работы.",
    rating: 4.7,
    reviewCount: 167,
    inStock: true,
  },
  {
    id: "6",
    name: "Минималистичный рюкзак",
    price: 4990,
    image: "https://cdn.poehali.dev/projects/8b304bc3-243a-4cbe-816a-1dc07d3decdb/files/266329ea-698f-44d2-af84-1e10def144aa.jpg",
    category: "Аксессуары",
    description: "Лёгкий городской рюкзак с отделением для ноутбука до 15 дюймов. Водоотталкивающая ткань.",
    rating: 4.4,
    reviewCount: 78,
    inStock: false,
  },
];

const DEMO_REVIEWS: Review[] = [
  { id: "r1", productId: "1", author: "Алексей", rating: 5, text: "Отличные наушники! Звук просто космос, шумоподавление работает на ура.", date: "2026-02-10" },
  { id: "r2", productId: "1", author: "Мария", rating: 4, text: "Хорошее качество за свою цену. Удобно сидят, батарея держит долго.", date: "2026-02-08" },
  { id: "r3", productId: "2", author: "Дмитрий", rating: 5, text: "Лучшие смарт-часы что у меня были. Экран яркий, функций масса.", date: "2026-02-12" },
  { id: "r4", productId: "3", author: "Елена", rating: 5, text: "Шикарная сумка! Кожа мягкая, пахнет потрясающе. Рекомендую!", date: "2026-02-05" },
];

const StoreContext = createContext<StoreContextType | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => loadFromStorage("store_products", DEMO_PRODUCTS));
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage("store_cart", []));
  const [orders, setOrders] = useState<Order[]>(() => loadFromStorage("store_orders", []));
  const [reviews, setReviews] = useState<Review[]>(() => loadFromStorage("store_reviews", DEMO_REVIEWS));
  const [isAdmin, setIsAdmin] = useState(() => loadFromStorage("store_admin", false));
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { localStorage.setItem("store_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("store_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("store_orders", JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem("store_reviews", JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem("store_admin", JSON.stringify(isAdmin)); }, [isAdmin]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId);
    setCart((prev) => prev.map((i) => i.product.id === productId ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addProduct = (product: Omit<Product, "id" | "rating" | "reviewCount">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      rating: 0,
      reviewCount: 0,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addReview = (review: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    };
    setReviews((prev) => [...prev, newReview]);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== review.productId) return p;
        const productReviews = [...reviews.filter((r) => r.productId === p.id), newReview];
        const avg = productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length;
        return { ...p, rating: Math.round(avg * 10) / 10, reviewCount: productReviews.length };
      })
    );
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    const order: Order = {
      id: Date.now().toString(),
      items: [...cart],
      total: cartTotal,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
  };

  return (
    <StoreContext.Provider
      value={{
        products, cart, orders, reviews, isAdmin, setIsAdmin,
        addToCart, removeFromCart, updateQuantity, clearCart,
        cartTotal, cartCount, addProduct, deleteProduct, addReview,
        placeOrder, selectedCategory, setSelectedCategory,
        searchQuery, setSearchQuery,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export default StoreProvider;
