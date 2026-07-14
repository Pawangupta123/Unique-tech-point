"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/layout/logo";
import { CallButton, WhatsAppButton } from "@/components/contact/contact-actions";
import { Icon } from "@/components/icon";
import { NAV_LINKS, CATEGORIES } from "@/lib/constants";

/** Mobile slide-in menu: links, categories and contact actions (search lives in the header). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle asChild>
            <Logo showText />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-2 pb-2 pt-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Separator />

        <div className="px-4 py-3">
          <p className="mb-1 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Shop by category
          </p>
          <div className="flex flex-col">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                onClick={close}
                className="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm hover:bg-muted"
              >
                <Icon name={cat.icon} className="size-4 text-brand-700" />
                <span className="flex-1">{cat.name}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-2 p-4">
          <CallButton size="sm" className="w-full" />
          <WhatsAppButton size="sm" className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
