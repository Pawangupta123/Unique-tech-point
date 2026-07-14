import Link from "next/link";
import { Phone, ChevronDown, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/layout/logo";
import { SearchBar } from "@/components/layout/search-bar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CallButton, WhatsAppButton } from "@/components/contact/contact-actions";
import { Icon } from "@/components/icon";
import { NAV_LINKS, CATEGORIES } from "@/lib/constants";
import { site, telLink } from "@/lib/site";

/** Site header: utility bar + sticky main nav with category dropdown & search. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40">
      {/* Utility bar */}
      <div className="hidden bg-brand-900 text-blue-100 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {site.address.line1}, {site.address.city}
          </span>
          <div className="flex items-center gap-4">
            <span>
              {site.hours.days}: {site.hours.weekdays.open}–{site.hours.weekdays.close}
            </span>
            <a href={telLink} className="flex items-center gap-1.5 font-medium hover:underline">
              <Phone className="size-3.5" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Logo className="shrink-0" />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) =>
              link.href === "/products" ? (
                <ProductsMenu key={link.href} />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <SearchBar className="ml-auto hidden max-w-xs flex-1 md:block lg:max-w-sm" />

          <div className="ml-auto hidden items-center gap-2 lg:ml-2 lg:flex">
            <CallButton size="sm" />
            <WhatsAppButton size="sm" />
          </div>

          <div className="ml-auto lg:hidden">
            <MobileNav />
          </div>
        </div>

        {/* Mobile search — always visible on phones (not hidden in the menu) */}
        <div className="border-t px-4 pb-3 pt-2 md:hidden">
          <SearchBar className="w-full" />
        </div>
      </div>
    </header>
  );
}

/** Desktop "Products" dropdown listing all categories. */
function ProductsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
        Products
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuItem asChild>
          <Link href="/products" className="font-medium">
            All products
          </Link>
        </DropdownMenuItem>
        {CATEGORIES.map((cat) => (
          <DropdownMenuItem key={cat.slug} asChild>
            <Link href={`/products/${cat.slug}`} className="gap-2.5">
              <Icon name={cat.icon} className="size-4 text-brand-700" />
              {cat.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
