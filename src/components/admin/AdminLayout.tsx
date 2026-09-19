import { Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronLeft,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Store,
  Users,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "داشبورد", icon: LayoutDashboard, to: "/admin" },
] as const;

const soonItems = [
  { label: "سفارش‌ها", icon: ShoppingCart },
  { label: "محصولات", icon: Package },
  { label: "مشتریان", icon: Users },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#151515] text-white">
      <div className="flex h-[72px] items-center border-b border-white/10 px-6">
        <Link to="/admin" className="flex items-center gap-3" onClick={onNavigate}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-sm font-black">
            11
          </span>
          <div>
            <p className="text-sm font-black tracking-[0.16em]">ELEVEN</p>
            <p className="mt-0.5 text-[10px] text-white/45">مرکز مدیریت فروشگاه</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5" aria-label="منوی مدیریت">
        <p className="mb-3 px-3 text-[10px] font-bold text-white/35">مدیریت</p>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-white text-ink shadow-sm" }}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white"
          >
            <item.icon className="h-[18px] w-[18px]" />
            <span>{item.label}</span>
          </Link>
        ))}
        {soonItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-white/35"
          >
            <item.icon className="h-[18px] w-[18px]" />
            <span>{item.label}</span>
            <span className="mr-auto rounded-full bg-white/10 px-2 py-0.5 text-[9px]">به‌زودی</span>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-[12px] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Store className="h-[18px] w-[18px]" />
          مشاهده فروشگاه
          <ChevronLeft className="mr-auto h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f3] text-ink lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-[248px] lg:block">
        <SidebarContent />
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/45 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
      >
        <aside
          className={cn(
            "h-full w-[280px] max-w-[84vw] transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            aria-label="بستن منو"
            className="absolute left-4 top-5 z-10 rounded-md p-2 text-white/60 hover:bg-white/10"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </aside>
      </div>

      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-black/5 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <button
            type="button"
            aria-label="باز کردن منو"
            className="rounded-lg border border-border p-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              aria-label="جستجو در پنل"
              placeholder="جستجو در پنل مدیریت..."
              className="h-10 w-full rounded-lg border-0 bg-[#f4f4f2] pr-10 pl-3 text-[12px] outline-none ring-brand/20 transition focus:ring-2"
            />
          </div>

          <div className="mr-auto flex items-center gap-2">
            <button
              type="button"
              className="relative rounded-lg p-2.5 text-muted-foreground transition hover:bg-muted hover:text-ink"
              aria-label="اعلان‌ها"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute left-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-brand" />
            </button>
            <div className="mr-1 flex items-center gap-2 border-r border-border pr-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                م‌ع
              </div>
              <div className="hidden sm:block">
                <p className="text-[12px] font-bold">مدیر فروشگاه</p>
                <p className="text-[10px] text-muted-foreground">دسترسی کامل</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
