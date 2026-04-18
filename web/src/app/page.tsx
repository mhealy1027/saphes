"use client";

import Link from "next/link";

const SUBSTACK_URL = "https://substack.com/@mhealy1027";

const BALANCE_SHEET = [
  { year: 431, s1: 6000, s2: 6000, s3: 6000 },
  { year: 425, s1: 3200, s2: 4100, s3: 2800 },
  { year: 421, s1: 2400, s2: 3300, s3: 2100 },
  { year: 416, s1: 4100, s2: 4800, s3: 3600 },
  { year: 415, s1: 3600, s2: 4200, s3: 3100 },
  { year: 413, s1: 800, s2: 1400, s3: 400 },
  { year: 410, s1: 1200, s2: 1900, s3: 900 },
  { year: 404, s1: -200, s2: 300, s3: -600 },
];

const IRON_RESERVE = 1000;

function formatBalance(val: number) {
  if (val === 0) return "—";
  return (val > 0 ? "" : "-") + Math.abs(val).toLocaleString();
}

function balanceColor(val: number) {
  if (val < 0) return "var(--red)";
  if (val < IRON_RESERVE) return "#f97316"; // below iron reserve
  return "var(--accent)";
}

export default function Home() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2.5rem" }}>
      {/* Hero */}
      <section
        style={{
          paddingTop: "6rem",
          paddingBottom: "5rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
          <h1
            style={{
              fontSize: "clamp(3.5rem, 8vw, 6rem)",
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: "0.25rem",
              lineHeight: 1,
              color: "var(--text-primary)",
            }}
          >
            Saphes
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              fontFamily: "var(--font-cormorant), serif",
              color: "var(--accent)",
              marginBottom: "1.75rem",
              letterSpacing: "0.04em",
            }}
          >
            σαφής
          </p>
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "var(--text-secondary)",
              fontFamily: "var(--font-inter), sans-serif",
              letterSpacing: "0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Structured data extraction from ancient texts
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--text-secondary)",
              maxWidth: "560px",
              marginBottom: "2.5rem",
            }}
          >
            Ancient historians recorded vast quantities of financial and military
            data — tribute assessments, fleet sizes, siege costs, troop counts —
            buried in narrative prose. Saphes uses AI to extract this latent
            quantitative information into analyst-ready spreadsheets, making the
            numbers in ancient texts as accessible as the words.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            <Link href="/explorer" className="btn-gold">
              Explore the Data
            </Link>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                padding: "0.625rem 0",
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--text-secondary)")
              }
            >
              Read the Paper →
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <p className="section-label">What Saphes Found</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
          }}
        >
          {[
            {
              number: "2,003",
              label: "data points extracted from Thucydides",
            },
            { number: "917", label: "chapters processed in 30 minutes" },
            { number: "3", label: "financial scenarios modeled" },
          ].map((stat) => (
            <div key={stat.number}>
              <div
                className="mono"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 600,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Balance Sheet */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "5rem",
        }}
      >
        <p className="section-label">The Three Scenarios</p>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            marginBottom: "0.75rem",
          }}
        >
          Athenian Treasury Balance, 431–404 BCE
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            marginBottom: "2.5rem",
            maxWidth: "560px",
            lineHeight: 1.6,
          }}
        >
          Three reconstructions of Athenian wartime finances derived from
          Saphes' extractions. Scenario 1 uses only Thucydides' explicit figures.
          Scenario 2 fills gaps with average scholarly estimates. Scenario 3 uses
          the Against-the-Logographers (ATL) tribute reconstruction. Values in
          talents. Iron reserve: {IRON_RESERVE.toLocaleString()} talents.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ minWidth: "560px" }}>
            <thead>
              <tr>
                <th>Year BCE</th>
                <th style={{ textAlign: "right" }}>
                  Scenario 1{" "}
                  <span
                    style={{ fontWeight: 400, textTransform: "none" }}
                  >
                    (Thucydides)
                  </span>
                </th>
                <th style={{ textAlign: "right" }}>
                  Scenario 2{" "}
                  <span style={{ fontWeight: 400, textTransform: "none" }}>
                    (Average)
                  </span>
                </th>
                <th style={{ textAlign: "right" }}>
                  Scenario 3{" "}
                  <span style={{ fontWeight: 400, textTransform: "none" }}>
                    (ATL)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {BALANCE_SHEET.map((row) => (
                <tr key={row.year}>
                  <td className="mono" style={{ color: "var(--text-primary)" }}>
                    {row.year}
                  </td>
                  <td
                    className="mono"
                    style={{
                      textAlign: "right",
                      color: balanceColor(row.s1),
                      fontWeight: 500,
                    }}
                  >
                    {formatBalance(row.s1)}
                  </td>
                  <td
                    className="mono"
                    style={{
                      textAlign: "right",
                      color: balanceColor(row.s2),
                      fontWeight: 500,
                    }}
                  >
                    {formatBalance(row.s2)}
                  </td>
                  <td
                    className="mono"
                    style={{
                      textAlign: "right",
                      color: balanceColor(row.s3),
                      fontWeight: 500,
                    }}
                  >
                    {formatBalance(row.s3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { color: "var(--accent)", label: "Above iron reserve" },
            { color: "#f97316", label: "Below iron reserve" },
            { color: "var(--red)", label: "Negative balance" },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: item.color,
                }}
              />
              <span
                style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
