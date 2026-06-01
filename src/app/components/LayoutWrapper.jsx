"use client";

import { usePathname } from "next/navigation";

import Navbar from "./Navbar";

import FooterFull from "./FooterFull";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      {children}

      {!isAdminRoute && <FooterFull />}
    </>
  );
}
