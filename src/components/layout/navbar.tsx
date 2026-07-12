"use client";

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
import { useEffect, useState } from "react";

/** Site header: utility bar + sticky main nav with category dropdown & search. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "shadow-lg shadow-black/5"
          : ""
      }`}
    >
      {/* Utility bar */}
      <div className={`hidden bg-brand-900 text-blue-100 md:block transition-opacity duration-300 ${scrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {site.address.line1}, {site.address.city}
          </span>
          <div className="flex items-center gap-4">
            <span>{site.hours.days}: {site.hours.weekdays.open}–{site.hours.weekdays.close}</span>
            <a href={telLink} className="flex items-center gap-1.5 font-medium hover:underline">
              <Phone className="size-3.5" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300 ${
          scrolled
            ? "border-b border-brand-200/20 shadow-sm"
            : ""
        }`}
      >
        <div className={`mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 transition-all duration-300 ${scrolled ? "h-14" : ""}`}>
          <Logo className="shrink-0 transition-transform duration-300 hover:scale-105" />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) =>
              link.href === "/products" ? (
                <ProductsMenu key={link.href} />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground magnetic-btn"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-brand-600 transition-all duration-300 group-hover:w-4/5" />
                </Link>
              ),
            )}
          </nav>

          <SearchBar className="ml-auto hidden max-w-xs flex-1 md:block lg:max-w-sm" />

          <div className="ml-auto hidden items-center gap-2 lg:ml-2 lg:flex">
            <CallButton size="sm" className="magnetic-btn" />
            <WhatsAppButton size="sm" className="magnetic-btn" />
          </div>

          <div className="ml-auto lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

/** Desktop "Products" dropdown listing all categories. */
function ProductsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring magnetic-btn">
        Products
        <ChevronDown className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 animate-scale-in">
        <DropdownMenuItem asChild>
          <Link href="/products" className="font-medium">
            All products
          </Link>
        </DropdownMenuItem>
        {CATEGORIES.map((cat) => (
          <DropdownMenuItem key={cat.slug} asChild>
            <Link href={`/products/${cat.slug}`} className="gap-2.5">
              <Icon name={cat.icon} className="size-4 text-brand-700 transition-transform duration-300 hover:scale-110" />
              {cat.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
