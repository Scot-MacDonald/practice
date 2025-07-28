"use client";

import { useHeaderTheme } from "@/providers/HeaderTheme";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { Header } from "@/payload-types";
import { Logo } from "@/components/Logo/Logo";
import { HeaderNav } from "./Nav";
import { usePathname } from "@/i18n/routing";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";

interface HeaderClientProps {
  header: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setHeaderTheme(null);
  }, [pathname, setHeaderTheme]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
  }, [headerTheme, theme]);

  const closeSheet = () => setOpen(false);
  const t = useTranslations();

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-gray-100  px-4 py-4"
      {...(theme ? { "data-theme": theme } : {})}
    >
      <div className="flex justify-between items-center">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo />
          </Link>
          <div className="pl-3 hidden  lg:flex">
            <HeaderNav header={header} />
          </div>
        </div>

        {/* Right: Appointment button */}
        <div className="hidden lg:flex items-center">
          <p className="text-xs text-black pr-2">
            <span>{t("appointments.line1")}</span>
            <br />
            <span>{t("appointments.line2")}</span>
          </p>
          <Link
            href="/"
            className="bg-[#cde3c5] text-lg font-semibold px-4 py-2 rounded"
          >
            {t("appointment")}
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center gap-3">
          <Link href="/" className="bg-[#cde3c5] px-2 py-1  rounded">
            {t("appointment")}
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="p-2">
              <MenuIcon className="w-8 h-8" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64 flex flex-col gap-4 p-4">
              <SheetHeader>
                <VisuallyHidden>
                  <SheetTitle>Menu</SheetTitle>
                </VisuallyHidden>
              </SheetHeader>
              <Link href="/" onClick={closeSheet} className="mb-2">
                <Logo />
              </Link>
              <HeaderNav header={header} onClickLink={closeSheet} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
