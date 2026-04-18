import Link from "next/link";

const SUBSTACK_URL = "https://substack.com/@mhealy1027";
const GITHUB_URL = "https://github.com/mhealy1027/saphes";

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 2.5rem" }}>
      {/* Header */}
      <div
        style={{
          paddingTop: "3rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "0.5rem" }}>
          About Saphes
        </h1>
      </div>

      {/* Main content */}
      <div
        style={{
          paddingTop: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
          }}
        >
          Saphes is an open-source research tool that extracts structured,
          tabular data from ancient Greek and Latin texts hosted in the{" "}
          <a
            href="http://www.perseus.tufts.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Perseus Digital Library
          </a>
          . It was built by Michael Healy.
        </p>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
          }}
        >
          The name comes from the Greek word{" "}
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.125rem",
              color: "var(--accent)",
            }}
          >
            σαφής
          </span>
          , meaning &ldquo;clear&rdquo; or &ldquo;self-evident.&rdquo;
          Thucydides uses it to describe his aspiration as a historian. Saphes
          aspires to make the quantitative data latent in ancient texts
          self-evident in a spreadsheet.
        </p>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
          }}
        >
          The tool was born from a specific frustration. While writing an
          undergraduate thesis on Athenian war finance during the Peloponnesian
          War, I spent months manually extracting 180 data points from
          Thucydides. Saphes extracted 2,003 in thirty minutes and reproduced my
          thesis analysis in two.
        </p>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "2rem",
          }}
        />

        {/* Links section */}
        <div>
          <p className="section-label">Links</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            {[
              {
                label: "GitHub",
                href: GITHUB_URL,
                desc: "github.com/mhealy1027/saphes",
              },
              {
                label: "Substack",
                href: SUBSTACK_URL,
                desc: "The methodology post",
              },
              {
                label: "Original Thesis",
                href: null,
                desc: "Available on request",
              },
            ].map((link) => (
              <div
                key={link.label}
                style={{ display: "flex", gap: "2rem", alignItems: "baseline" }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                    width: "80px",
                    flexShrink: 0,
                  }}
                >
                  {link.label}
                </span>
                {link.href ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.9375rem" }}
                  >
                    {link.desc}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: "0.9375rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {link.desc}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "2rem",
          }}
        >
          <p className="section-label">Michael Healy</p>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              fontStyle: "italic",
            }}
          >
            &ldquo;Classics. Energy. AI. I like sweeping, grand theories of
            human development.&rdquo;
          </p>
        </div>

        {/* Open source */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "2rem",
            paddingBottom: "4rem",
          }}
        >
          <p className="section-label">Open Source</p>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            Saphes is MIT licensed. The extraction pipeline, schemas, and web
            interface are all available on{" "}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            . Contributions and new schema definitions are welcome.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/explorer" className="btn-gold">
              Explore the Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
