import { getCachedGlobal } from "@/utilities/getGlobals";
import Link from "next/link";
import React from "react";

import type { Footer } from "@/payload-types";

import { ThemeSelector } from "@/providers/Theme/ThemeSelector";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { CMSLink } from "@/components/Link";
import { TypedLocale } from "payload";
import { OpeningHours } from "@/components/OpeningHours";
// import { OpeningHours } from '@/components/OpeningHours'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footer: Footer = await getCachedGlobal("footer", 1, locale)();

  const navItems = footer?.navItems || [];

  return (
    <footer className="border-t border-border">
      <div className="container-full px-6 py-2 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6  py-3 px-0">
          {/* First 3 columns inside a flex wrapper that takes 8/12 space on lg */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row gap-6">
            {/* Column 1: Address */}
            <div className="flex-1 flex flex-col gap-1 leading-snug">
              <div className="font-semibold">SPP-Mitte</div>
              <div>Linienstraße 127 (VH, 2. OG rechts)</div>
              <div>10115 Berlin-Mitte</div>
            </div>

            {/* Column 2: Contact */}
            <div className="flex-1 flex flex-col gap-1 leading-snug">
              <div className="font-semibold">Kontakt</div>
              <div>Tel.: 030 - 282 50 52</div>
              <div>Fax: 030 - 278 90 537</div>
              <div>info@spp.de</div>
            </div>

            {/* Column 3: Infos */}
            <div className="flex-1 flex flex-col gap-1  leading-snug">
              <div className="font-semibold">Infos</div>
              <nav className="flex flex-col gap-2">
                {navItems.map(({ link }, i) => (
                  <CMSLink className="" key={i} {...link} />
                ))}
              </nav>
            </div>
          </div>

          {/* Column 4: Opening Hours (takes 4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-1  leading-snug">
            <div className="font-semibold">Opening hours</div>
            <OpeningHours />
          </div>
        </div>
      </div>
    </footer>
  );
}
