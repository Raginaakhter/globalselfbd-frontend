// Shapes returned by the Express API (see http://localhost:5000/api-docs).

export type Status = "ACTIVE" | "INACTIVE";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategoryId: string | null;
  imageUrl: string | null;
  description: string;
  status: Status;
  parent?: { _id: string; name: string; slug: string; status: Status } | null;
  path?: string;
  level?: number;
  childrenCount?: number;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

export type ProductUnit = "KG" | "GM" | "Liter" | "ML" | "Meter" | "CM" | "Piece";

export interface Product {
  _id: string;
  productTitle: string;
  slug: string;
  productDescription: string;
  categoryId: { _id: string; name: string; slug: string; status: Status } | null;
  customerSellPrice: number;
  customerSpecialPrice: number | null;
  finalPrice: number;
  discountPercent: number;
  isFabric: boolean;
  sizes: string[];
  unit: ProductUnit | null;
  quantity: number | null;
  thumbnail: string;
  gallery: string[];
  availability: "IN_STOCK" | "OUT_OF_STOCK";
  status: Status;
  /** Staff with inventory.view only */
  stock?: number;
  /** Staff with products.update only */
  productCost?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductOptions {
  categories: { _id: string; name: string; slug: string; path: string }[];
  sizes: string[];
  units: string[];
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type PaymentMethod = "CASH_ON_DELIVERY" | "BKASH" | "NAGAD" | "ROCKET" | "CARD";

export interface ShippingInformation {
  name: string;
  phone: string;
  email?: string | null;
  address: string;
  city: string;
  area: string;
  orderNotes?: string;
}

export interface OrderItem {
  _id: string;
  productId: string;
  productTitleSnapshot: string;
  thumbnailSnapshot: string;
  quantity: number;
  selectedSize: string | null;
  selectedUnit: string | null;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  itemCount: number;
  totalQuantity: number;
  subtotal: number;
  discount: number;
  shippingCost: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingInformation: ShippingInformation;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrder extends Order {
  customer?: { _id: string; fullName: string; email: string } | null;
  allowedNextStatuses?: OrderStatus[];
  allowedNextPaymentStatuses?: PaymentStatus[];
}

export interface AdminOrderListItem {
  _id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  itemCount: number;
  totalQuantity: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
}

export interface OrderListItem {
  _id: string;
  orderNumber: string;
  itemCount: number;
  totalQuantity: number;
  firstItem: { productTitle: string; thumbnail: string } | null;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
}

export interface RoleRef {
  _id: string;
  name: string;
  status: Status;
  isProtected?: boolean;
}

export interface BackendUser {
  _id: string;
  fullName: string;
  email: string;
  role: RoleRef | null;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  _id: string;
  name: string;
  description: string;
  status: Status;
  isProtected: boolean;
  userCount?: number;
  permissionCount?: number;
  permissions?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  _id: string;
  name: string;
  module: string;
  action: string;
  description: string;
}

export interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  selectedSize: string | null;
  selectedUnit: string | null;
  unitPrice: number;
  subtotal: number;
  productSnapshot: { productTitle: string; slug: string; thumbnail: string; customerSellPrice: number; customerSpecialPrice: number | null };
  availability: "IN_STOCK" | "OUT_OF_STOCK";
  isAvailable: boolean;
  issue: string | null;
}

export interface Cart {
  _id: string;
  items: CartItem[];
  itemCount: number;
  totalQuantity: number;
  subtotal: number;
  hasIssues: boolean;
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CASH_ON_DELIVERY: "Cash on Delivery",
  BKASH: "bKash",
  NAGAD: "Nagad",
  ROCKET: "Rocket",
  CARD: "Card",
};

/* ---------- Landing page content (banners, brands, footer) ---------- */

/** HERO = big banner (several = slider), PROMO = small promo card beside it (max 2 active). */
export type BannerPlacement = "HERO" | "PROMO";

export interface Banner {
  _id: string;
  placement: BannerPlacement;
  imageUrl: string;
  mobileImageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  /** A path like "/shop" or a full http(s) URL. */
  buttonLink: string;
  altText: string;
  sortOrder: number;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  link: string;
  isFeatured: boolean;
  sortOrder: number;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

export const SOCIAL_NETWORKS = ["facebook", "instagram", "youtube", "tiktok", "twitter", "linkedin", "whatsapp"] as const;
export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number];

export interface FooterSettings {
  logoUrl: string;
  aboutText: string;
  contact: { phone: string; email: string; address: string };
  socialLinks: Record<SocialNetwork, string>;
  columns: { title: string; links: { label: string; url: string }[] }[];
  copyrightText: string;
}

export const EMPTY_FOOTER: FooterSettings = {
  logoUrl: "",
  aboutText: "",
  contact: { phone: "", email: "", address: "" },
  socialLinks: { facebook: "", instagram: "", youtube: "", tiktok: "", twitter: "", linkedin: "", whatsapp: "" },
  columns: [],
  copyrightText: "",
};

/* ---------- Reports ---------- */

export type ReportPeriodKey = "today" | "yesterday" | "last7Days" | "last14Days" | "last30Days" | "last6Months" | "last1Year";

export interface PaymentPeriod {
  key: ReportPeriodKey;
  label: string;
  from: string;
  to: string;
  received: { amount: number; orders: number };
  refunded: { amount: number; orders: number };
  net: number;
}

export interface PaymentsReport {
  currency: string;
  timezone: string;
  periods: PaymentPeriod[];
  outstanding: { amount: number; orders: number; byPaymentMethod: { paymentMethod: PaymentMethod; orders: number; amount: number }[] };
}

export interface SalesPeriod {
  key: ReportPeriodKey;
  label: string;
  from: string;
  to: string;
  amount: number;
  orders: number;
  productSales: number;
  shippingCost: number;
  discount: number;
}

export interface SalesReport {
  currency: string;
  timezone: string;
  basis: string;
  periods: SalesPeriod[];
  ordersByStatus: Record<OrderStatus, { orders: number; amount: number }>;
}

export type SalesChartRange = "7d" | "14d" | "30d" | "6m" | "1y";

export interface SalesChart {
  range: SalesChartRange;
  groupBy: "day" | "month";
  currency: string;
  total: { amount: number; orders: number };
  points: { label: string; amount: number; orders: number }[];
}
