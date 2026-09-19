export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface AdminOrder {
  id: string;
  customer: string;
  phone: string;
  date: string;
  total: number;
  items: number;
  status: OrderStatus;
  payment: "paid" | "pending" | "refunded";
  city: string;
}

export const seedOrders: AdminOrder[] = [
  {
    id: "EL-۱۰۲۴۸",
    customer: "آرین محمدی",
    phone: "۰۹۱۲ ۳۴۵ ۸۷۱۲",
    date: "۲۸ شهریور، ۱۲:۴۰",
    total: 4_480_000,
    items: 2,
    status: "processing",
    payment: "paid",
    city: "تهران",
  },
  {
    id: "EL-۱۰۲۴۷",
    customer: "سامیار احمدی",
    phone: "۰۹۳۵ ۷۸۰ ۱۱۴۲",
    date: "۲۸ شهریور، ۱۱:۱۵",
    total: 1_490_000,
    items: 1,
    status: "pending",
    payment: "paid",
    city: "کرج",
  },
  {
    id: "EL-۱۰۲۴۶",
    customer: "کیان رستمی",
    phone: "۰۹۱۷ ۲۲۱ ۹۸۰۰",
    date: "۲۷ شهریور، ۱۹:۰۵",
    total: 3_680_000,
    items: 3,
    status: "shipped",
    payment: "paid",
    city: "شیراز",
  },
  {
    id: "EL-۱۰۲۴۵",
    customer: "پارسا کریمی",
    phone: "۰۹۱۴ ۸۸۰ ۳۲۱۰",
    date: "۲۷ شهریور، ۱۵:۳۰",
    total: 2_290_000,
    items: 1,
    status: "delivered",
    payment: "paid",
    city: "تبریز",
  },
  {
    id: "EL-۱۰۲۴۴",
    customer: "محمدطاها یوسفی",
    phone: "۰۹۱۳ ۹۰۱ ۴۴۷۷",
    date: "۲۶ شهریور، ۲۲:۱۰",
    total: 5_970_000,
    items: 3,
    status: "delivered",
    payment: "paid",
    city: "اصفهان",
  },
  {
    id: "EL-۱۰۲۴۳",
    customer: "ماهان قاسمی",
    phone: "۰۹۹۱ ۳۲۲ ۶۷۱۱",
    date: "۲۶ شهریور، ۱۸:۲۵",
    total: 890_000,
    items: 1,
    status: "cancelled",
    payment: "refunded",
    city: "رشت",
  },
];

export const salesTrend = [
  { day: "شنبه", sales: 12_400_000, orders: 7 },
  { day: "یکشنبه", sales: 18_900_000, orders: 11 },
  { day: "دوشنبه", sales: 15_600_000, orders: 9 },
  { day: "سه‌شنبه", sales: 24_800_000, orders: 14 },
  { day: "چهارشنبه", sales: 21_200_000, orders: 12 },
  { day: "پنجشنبه", sales: 31_400_000, orders: 18 },
  { day: "جمعه", sales: 27_600_000, orders: 15 },
];

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "در انتظار",
  processing: "در حال پردازش",
  shipped: "ارسال‌شده",
  delivered: "تحویل‌شده",
  cancelled: "لغوشده",
};
