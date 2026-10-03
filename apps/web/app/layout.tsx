import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "../app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manufacturing ERP",
  description: "A multi-tenant, AI-native manufacturing ERP workspace.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
