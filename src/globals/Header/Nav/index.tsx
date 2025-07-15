"use client";

import React from "react";

import type { Header as HeaderType } from "@/payload-types";

import { ThemeSelector } from "@/providers/Theme/ThemeSelector";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { CMSLink } from "@/components/Link";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface HeaderNavProps {
  header: HeaderType;
  onClickLink?: () => void; // <- add this
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  header,
  onClickLink,
}) => {
  const navItems = header?.navItems || [];
  const t = useTranslations();

  return (
    <nav className="flex items-center gap-3">
      {navItems.map(({ link }, i) => (
        <CMSLink key={i} {...link} appearance="link" onClick={onClickLink} />
      ))}
      <LocaleSwitcher />
    </nav>
  );
};
