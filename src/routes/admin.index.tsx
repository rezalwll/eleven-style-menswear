import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Banknote, Package, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderStatusLabels, salesTrend, seedOrders, type OrderStatus } from "@/data/admin";
import { products } from "@/data/products";
import { formatPrice, formatToman, toFa } from "@/lib/format";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const statusClass: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/15",
  processing: "bg-blue-50 text-blue-700 ring-blue-600/15",
  shipped: "bg-violet-50 text-violet-700 ring-violet-600/15",
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-600/15",
};

const metrics = [
  {
    label: "فروش امروز",
    value: formatToman(27_600_000),
    change: "+۱۲.۵٪",
    icon: Banknote,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "سفارش‌های جدید",
    value: toFa(15),
    change: "+۸.۲٪",
    icon: ShoppingBag,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    label: "محصولات فعال",
    value: toFa(products.length),
    change: `${toFa(products.filter((product) => product.stock <= 5).length)} کم‌موجودی`,
    icon: Package,
    tone: "bg-amber-50 text-amber-700",
  },
  {
    label: "مشتریان",
    value: toFa("۱٬۲۸۴"),
    change: "+۲۴ نفر",
    icon: Users,
    tone: "bg-violet-50 text-violet-700",
  },
];

const chartConfig = {
  sales: { label: "فروش", color: "var(--brand)" },
};

function AdminDashboard() {
  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold text-brand">شنبه، ۲۹ شهریور</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">سلام، روزت بخیر 👋</h1>
          <p className="mt-1.5 text-[12px] text-muted-foreground">
            این خلاصه‌ای از عملکرد امروز فروشگاه الون استایل است.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg border border-border bg-white px-4 text-[12px] font-bold shadow-sm transition hover:bg-muted sm:self-auto"
        >
          مشاهده فروشگاه <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="آمار امروز">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-medium text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-xl font-black tracking-tight">{metric.value}</p>
              </div>
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${metric.tone}`}>
                <metric.icon className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              <span className="font-bold text-emerald-600">{metric.change}</span>
              <span>نسبت به دیروز</span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_330px]">
        <article className="min-w-0 rounded-xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-sm font-black">روند فروش هفتگی</h2>
              <p className="mt-1 text-[11px] text-muted-foreground">مقایسه مبلغ فروش در ۷ روز گذشته</p>
            </div>
            <div className="text-left">
              <p className="text-lg font-black">۱۵۱٬۹۰۰٬۰۰۰</p>
              <p className="text-[10px] text-muted-foreground">تومان فروش کل</p>
            </div>
          </div>
          <ChartContainer config={chartConfig} className="h-[260px] w-full aspect-auto" dir="ltr">
            <AreaChart data={salesTrend} margin={{ left: 0, right: 4, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="4 4" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={12} />
              <YAxis
                axisLine={false}
                tickLine={false}
                width={42}
                tickFormatter={(value) => `${Math.round(value / 1_000_000)}م`}
              />
              <ChartTooltip
                cursor={{ stroke: "var(--border)" }}
                content={
                  <ChartTooltipContent
                    hideLabel={false}
                    formatter={(value) => (
                      <div className="flex w-full items-center justify-between gap-6">
                        <span className="text-muted-foreground">فروش</span>
                        <span className="font-bold">{formatToman(Number(value))}</span>
                      </div>
                    )}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="var(--color-sales)"
                strokeWidth={2.5}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </article>

        <article className="rounded-xl border border-black/5 bg-[#1a1a1a] p-6 text-white shadow-sm">
          <p className="text-[11px] text-white/50">هدف فروش ماهانه</p>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-3xl font-black">۷۳٪</p>
              <p className="mt-1 text-[10px] text-white/45">تا امروز محقق شده</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-400">+۹٪ این هفته</span>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[73%] rounded-full bg-brand" />
          </div>
          <dl className="mt-7 space-y-4 text-[11px]">
            <div className="flex justify-between border-b border-white/10 pb-3">
              <dt className="text-white/45">فروش فعلی</dt>
              <dd className="font-bold">۳۶۵٬۴۰۰٬۰۰۰ تومان</dd>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-3">
              <dt className="text-white/45">هدف ماه</dt>
              <dd className="font-bold">۵۰۰٬۰۰۰٬۰۰۰ تومان</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/45">باقی‌مانده</dt>
              <dd className="font-bold text-amber-300">۱۳۴٬۶۰۰٬۰۰۰ تومان</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-sm font-black">آخرین سفارش‌ها</h2>
            <p className="mt-1 text-[10px] text-muted-foreground">سفارش‌های ثبت‌شده اخیر فروشگاه</p>
          </div>
          <button type="button" className="text-[11px] font-bold text-brand hover:underline">
            مشاهده همه
          </button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#fafaf9] hover:bg-[#fafaf9]">
              <TableHead className="px-5 text-right text-[10px]">شماره سفارش</TableHead>
              <TableHead className="text-right text-[10px]">مشتری</TableHead>
              <TableHead className="text-right text-[10px]">تاریخ</TableHead>
              <TableHead className="text-right text-[10px]">مبلغ</TableHead>
              <TableHead className="text-right text-[10px]">وضعیت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seedOrders.slice(0, 5).map((order) => (
              <TableRow key={order.id} className="text-[11px]">
                <TableCell className="px-5 font-bold" dir="ltr">{order.id}</TableCell>
                <TableCell>
                  <p className="font-bold">{order.customer}</p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">{order.city}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                <TableCell className="font-bold">{formatPrice(order.total)} تومان</TableCell>
                <TableCell>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold ring-1 ring-inset ${statusClass[order.status]}`}>
                    {orderStatusLabels[order.status]}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
