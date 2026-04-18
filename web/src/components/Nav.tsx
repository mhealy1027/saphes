"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/explorer", label: "Explorer" },
  { href: "/analyze", label: "Analyze" },
  { href: "/texts", label: "Texts" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(10, 15, 30, 0.96)",
        borderBottom: "1px solid var(--border)",
        padding: "0 2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "56px",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.375rem",
          fontWeight: 600,
          color: "var(--accent)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Saphes
      </Link>

      {/* Desktop links */}
      <div
        className="desktop-nav"
        style={{
          display: "flex",
          gap: "2.5rem",
          alignItems: "center",
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color:
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "var(--accent)"
                  : "var(--text-secondary)",
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => {
              if (
                !pathname.startsWith(link.href)
              ) {
                (e.target as HTMLElement).style.color = "var(--accent)";
              }
            }}
            onMouseLeave={(e) => {
              if (
                !pathname.startsWith(link.href)
              ) {
                (e.target as HTMLElement).style.color = "var(--text-secondary)";
              }
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "var(--text-primary)",
          cursor: "pointer",
          padding: "0.25rem",
        }}
        aria-label="Toggle menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {menuOpen ? (
            <>
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </>
          ) : (
            <>
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "absolute",
            top: "56px",
            left: 0,
            right: 0,
            backgroundColor: "var(--bg-primary)",
            borderBottom: "1px solid var(--border)",
            padding: "1rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color:
                  pathname === link.href
                    ? "var(--accent)"
                    : "var(--text-secondary)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
