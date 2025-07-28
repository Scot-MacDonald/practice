import { getCachedGlobal } from "@/utilities/getGlobals";
import React from "react";

import type { Footer } from "@/payload-types";

import { OpeningHours } from "@/components/OpeningHours";
import { CMSLink } from "@/components/Link";
import { TypedLocale } from "payload";

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footer: Footer = await getCachedGlobal("footer", 1, locale)();
  const navItems = footer?.navItems || [];

  return (
    <footer className="border-t border-border">
      <div className="container-full px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Column 1: Address */}
          <div className="flex flex-col gap-1 leading-snug">
            <div className="font-semibold">SPP-Mitte</div>
            <div>Linienstraße 127 (VH, 2. OG rechts)</div>
            <div>10115 Berlin-Mitte</div>
          </div>

          {/* Column 2: Contact */}
          <div className="flex flex-col gap-1 leading-snug">
            <div className="font-semibold">Kontakt</div>
            <div>Tel.: 030 - 282 50 52</div>
            <div>Fax: 030 - 278 90 537</div>
            <div>info@spp.de</div>
          </div>

          {/* Column 3: Infos */}
          <div className="flex flex-col gap-1 leading-snug">
            <div className="font-semibold">Infos</div>
            <nav className="flex flex-col gap-2">
              {navItems.map(({ link }, i) => (
                <CMSLink key={i} {...link} />
              ))}
            </nav>
          </div>

          {/* Column 4: Opening Hours */}
          <div className="flex flex-col gap-1 leading-snug">
            <div className="font-semibold">Opening hours</div>
            <OpeningHours />
          </div>
        </div>
      </div>
    </footer>
  );
}
