"use client";

import { useEffect, useMemo, useState } from "react";

interface Extraction {
  id: number;
  book: number;
  chapter: number;
  year_bce: number;
  actor: string;
  purpose: string;
  amount: number;
  unit: string;
  direction: string;
  confidence: "high" | "medium" | "low";
  greek_reference: string;
  notes: string;
}

type SortKey = keyof Extraction;
type SortDir = "asc" | "desc";

const PAGE_SIZE = 50;

const CONFIDENCE_DOT: Record<string, string> = {
  high: "#22c55e",
  medium: "#eab308",
  low: "#6b7280",
};

function downloadCSV(data: Extraction[]) {
  const cols: (keyof Extraction)[] = [
    "book",
    "chapter",
    "year_bce",
    "actor",
    "purpose",
    "amount",
    "unit",
    "direction",
    "confidence",
    "greek_reference",
    "notes",
  ];
  const header = cols.join(",");
  const rows = data.map((row) =>
    cols
      .map((c) => {
        const v = String(row[c] ?? "");
        return v.includes(",") || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v;
      })
      .join(",")
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "thucydides_extractions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function ExplorerPage() {
  const [data, setData] = useState<Extraction[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterActor, setFilterActor] = useState("All");
  const [filterBook, setFilterBook] = useState("All");
  const [filterUnit, setFilterUnit] = useState("All");
  const [filterDir, setFilterDir] = useState("All");
  const [filterConf, setFilterConf] = useState("All");

  const [sortKey, setSortKey] = useState<SortKey>("book");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("/data/thucydides_extractions.json")
      .then((r) => r.json())
      .then((d: Extraction[]) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  // Derived option lists
  const actors = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.actor))).sort()],
    [data]
  );
  const books = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => String(d.book)))).sort((a, b) => Number(a) - Number(b))],
    [data]
  );
  const units = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.unit))).sort()],
    [data]
  );
  const directions = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.direction))).sort()],
    [data]
  );

  // Filtered + sorted data
  const filtered = useMemo(() => {
    let r = data;
    if (filterActor !== "All") r = r.filter((d) => d.actor === filterActor);
    if (filterBook !== "All") r = r.filter((d) => String(d.book) === filterBook);
    if (filterUnit !== "All") r = r.filter((d) => d.unit === filterUnit);
    if (filterDir !== "All") r = r.filter((d) => d.direction === filterDir);
    if (filterConf !== "All") r = r.filter((d) => d.confidence === filterConf);
    r = [...r].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return r;
  }, [data, filterActor, filterBook, filterUnit, filterDir, filterConf, sortKey, sortDir]);

  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  }

  function resetFilters() {
    setFilterActor("All");
    setFilterBook("All");
    setFilterUnit("All");
    setFilterDir("All");
    setFilterConf("All");
    setPage(0);
  }

  function SortIndicator({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span style={{ color: "var(--border)" }}> ↕</span>;
    return <span style={{ color: "var(--accent)" }}>{sortDir === "asc" ? " ↑" : " ↓"}</span>;
  }

  const selectStyle = {
    width: "auto",
    minWidth: "120px",
    padding: "0.4rem 0.625rem",
    fontSize: "0.75rem",
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
      {/* Header */}
      <div
        style={{
          paddingTop: "3rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            marginBottom: "0.5rem",
          }}
        >
          Thucydides Explorer
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>
          2,003 extractions from the{" "}
          <em>History of the Peloponnesian War</em>
        </p>
      </div>

      {/* Sticky filter bar */}
      <div
        style={{
          position: "sticky",
          top: "56px",
          zIndex: 50,
          backgroundColor: "var(--bg-primary)",
          borderBottom: "1px solid var(--border)",
          padding: "0.875rem 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        <select
          value={filterActor}
          onChange={(e) => { setFilterActor(e.target.value); setPage(0); }}
          style={selectStyle}
          aria-label="Filter by actor"
        >
          {actors.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <select
          value={filterBook}
          onChange={(e) => { setFilterBook(e.target.value); setPage(0); }}
          style={selectStyle}
          aria-label="Filter by book"
        >
          {books.map((b) => (
            <option key={b}>{b === "All" ? "All Books" : `Book ${b}`}</option>
          ))}
        </select>
        <select
          value={filterUnit}
          onChange={(e) => { setFilterUnit(e.target.value); setPage(0); }}
          style={selectStyle}
          aria-label="Filter by unit"
        >
          {units.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
        <select
          value={filterDir}
          onChange={(e) => { setFilterDir(e.target.value); setPage(0); }}
          style={selectStyle}
          aria-label="Filter by direction"
        >
          {directions.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          value={filterConf}
          onChange={(e) => { setFilterConf(e.target.value); setPage(0); }}
          style={selectStyle}
          aria-label="Filter by confidence"
        >
          {["All", "high", "medium", "low"].map((c) => (
            <option key={c}>{c === "All" ? "All Confidence" : c}</option>
          ))}
        </select>
        <button className="btn-text" onClick={resetFilters} style={{ fontSize: "0.75rem" }}>
          Reset
        </button>
        <div style={{ marginLeft: "auto" }}>
          <button
            className="btn-gold"
            onClick={() => downloadCSV(filtered)}
            style={{ fontSize: "0.75rem", padding: "0.4rem 1rem" }}
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* Count */}
      <div
        style={{
          padding: "0.875rem 0",
          fontSize: "0.75rem",
          color: "var(--text-secondary)",
          fontFamily: "var(--font-jetbrains), monospace",
        }}
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            Showing{" "}
            <span style={{ color: "var(--text-primary)" }}>
              {filtered.length.toLocaleString()}
            </span>{" "}
            of <span style={{ color: "var(--text-primary)" }}>2,003</span> extractions
          </>
        )}
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ minWidth: "900px" }}>
          <thead>
            <tr>
              {(
                [
                  ["book", "Book"],
                  ["chapter", "Ch"],
                  ["year_bce", "Year BCE"],
                  ["actor", "Actor"],
                  ["purpose", "Purpose"],
                  ["amount", "Amount"],
                  ["unit", "Unit"],
                  ["direction", "Direction"],
                  ["confidence", "Conf"],
                ] as [SortKey, string][]
              ).map(([key, label]) => (
                <th
                  key={key}
                  className="sortable"
                  onClick={() => handleSort(key)}
                  style={{
                    textAlign:
                      key === "amount" ? "right" : "left",
                  }}
                >
                  {label}
                  <SortIndicator col={key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => (
              <tr key={row.id} title={row.notes}>
                <td
                  className="mono"
                  style={{ color: "var(--text-primary)", fontWeight: 500 }}
                >
                  {row.book}
                </td>
                <td className="mono">{row.chapter}</td>
                <td className="mono">{row.year_bce}</td>
                <td style={{ color: "var(--text-primary)" }}>{row.actor}</td>
                <td
                  style={{
                    maxWidth: "320px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.purpose}
                </td>
                <td
                  className="mono"
                  style={{
                    textAlign: "right",
                    color:
                      row.unit === "talents"
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                    fontWeight: row.unit === "talents" ? 500 : 400,
                  }}
                >
                  {row.amount > 0 ? row.amount.toLocaleString() : "—"}
                </td>
                <td>{row.unit}</td>
                <td>{row.direction}</td>
                <td>
                  <span
                    title={row.confidence}
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50% !important" as "50%",
                      backgroundColor: CONFIDENCE_DOT[row.confidence],
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1.5rem 0",
            fontSize: "0.8125rem",
            color: "var(--text-secondary)",
          }}
        >
          <button
            className="btn-text"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{ opacity: page === 0 ? 0.3 : 1 }}
          >
            ← Prev
          </button>
          <span className="mono">
            {page + 1} / {totalPages}
          </span>
          <button
            className="btn-text"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            style={{ opacity: page === totalPages - 1 ? 0.3 : 1 }}
          >
            Next →
          </button>
        </div>
      )}

      <div style={{ height: "4rem" }} />
    </div>
  );
}
