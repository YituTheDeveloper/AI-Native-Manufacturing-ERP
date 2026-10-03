"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

type IconName = "overview" | "insights" | "products" | "sales" | "procurement" | "inventory" | "manufacturing" | "quality" | "finance" | "documents" | "settings";

type NavItem = {
  label: string;
  href: string;
  icon: IconName;
};

const groups: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { label: "Overview", href: "/", icon: "overview" },
      { label: "Insights", href: "/insights", icon: "insights" },
    ],
  },
  {
    label: "Commercial",
    items: [
      { label: "Products and CRM", href: "/products", icon: "products" },
      { label: "Sales orders", href: "/sales/orders", icon: "sales" },
      { label: "Procurement", href: "/procurement", icon: "procurement" },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Inventory", href: "/inventory", icon: "inventory" },
      { label: "Manufacturing", href: "/manufacturing", icon: "manufacturing" },
      { label: "Quality", href: "/quality", icon: "quality" },
    ],
  },
  {
    label: "Finance",
    items: [{ label: "Finance", href: "/finance", icon: "finance" }],
  },
  {
    label: "Administration",
    items: [
      { label: "Documents", href: "/documents", icon: "documents" },
      { label: "Settings", href: "/settings", icon: "settings" },
    ],
  },
];

const iconPaths: Record<IconName, string> = {
  overview: "M3 3h7v7H3z M14 3h7v4h-7z M14 10h7v11h-7z M3 14h7v7H3z",
  insights: "M4 19V5 M4 19h17 M8 15l3-4 3 2 5-7",
  products: "M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z M4 7.5l8 4.5 8-4.5 M12 12v9 M8 5.2l8 4.6",
  sales: "M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 1.9-1.4L21 9H6 M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2 M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  procurement: "M4 5h16v15H4z M8 3v4 M16 3v4 M4 10h16 M8 14h3 M8 17h6",
  inventory: "M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z M3 7.5 12 12l9-4.5 M12 12v9 M7.5 5.3l9 4.6",
  manufacturing: "M3 21V9l6 3V7l6 3V4l6 3v14z M7 17h2 M12 17h2 M17 17h2",
  quality: "m12 3 2.7 1.6 3.1.4.4 3.1L20 11l-1.6 2.7-.4 3.1-3.1.4L12 19l-2.7-1.6-3.1-.4-.4-3.1L4 11l1.6-2.7.4-3.1 3.1-.4z M9 11.5l2 2 4-4",
  finance: "M3 7h18 M5 7V5h14v2 M5 7v13h14V7 M9 11h6 M9 15h3",
  documents: "M6 3h8l4 4v14H6z M14 3v5h5 M9 12h6 M9 16h6",
  settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 2.9-.2-.1a1.7 1.7 0 0 0-1.8 0l-.2.1-3.3-.9-.1-.2a1.7 1.7 0 0 0-1.4-1l-.2-.1-1.3-3.1.1-.2a1.7 1.7 0 0 0-.5-1.7l-.1-.2 1.3-3.1.2-.1a1.7 1.7 0 0 0 1.4-1l.1-.2 3.3-.9.2.1a1.7 1.7 0 0 0 1.8 0l.2-.1 1.7 2.9-.1.1a1.7 1.7 0 0 0-.3 1.9l.1.2z",
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg aria-hidden="true" className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={iconPaths[name]} />
    </svg>
  );
}

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeItem = groups.flatMap((group) => group.items).find((item) => item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href)));

  return (
    <div className="app-frame">
      <button className={`sidebar-scrim${menuOpen ? " is-visible" : ""}`} aria-label="Close navigation" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1} />
      <aside className={`sidebar${menuOpen ? " sidebar-open" : ""}`} aria-label="Main navigation">
        <Link className="brand" href="/" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">M</span>
          <span className="brand-copy"><strong>MANUFACTURING</strong><small>ERP WORKSPACE</small></span>
        </Link>

        <div className="workspace-switcher">
          <span className="workspace-avatar" aria-hidden="true">W</span>
          <span className="workspace-label"><strong>Development workspace</strong><small>Setup in progress</small></span>
          <span className="switcher-chevron" aria-hidden="true">⌄</span>
        </div>

        <nav className="primary-nav">
          {groups.map((group) => (
            <section className="nav-group" key={group.label} aria-label={group.label}>
              <h2>{group.label}</h2>
              {group.items.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link className={`nav-link${isActive ? " nav-link-active" : ""}`} href={item.href} key={item.href} aria-current={isActive ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </section>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="setup-indicator"><span className="status-dot" /><span>Environment setup</span><span className="setup-label">ACTIVE</span></div>
          <p>Connect the API and database to load live ERP data.</p>
        </div>
      </aside>

      <div className="content-column">
        <header className="topbar">
          <button className="mobile-menu-button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <span /><span /><span />
          </button>
          <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-separator">/</span><strong>{activeItem?.label ?? "Overview"}</strong></div>
          <div className="topbar-status"><span className="status-dot" /> DEVELOPMENT</div>
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
