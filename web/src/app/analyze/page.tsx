"use client";

import { useState, useRef } from "react";

const STEPS = [
  "Loading cached extractions...",
  "Filtering to relevant data...",
  "Building context window...",
  "Running Claude analysis...",
  "Formatting results...",
];

export default function AnalyzePage() {
  const [question, setQuestion] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyExpanded, setApiKeyExpanded] = useState(false);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  function handleRun() {
    if (!question.trim()) return;
    if (!apiKey.trim()) {
      setApiKeyExpanded(true);
      return;
    }
    setRunning(true);
    setDone(false);
    setLog([]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < STEPS.length) {
        setLog((prev) => [
          ...prev,
          `[STEP ${step + 1}/${STEPS.length}] ${STEPS[step]}`,
        ]);
        step++;
        setTimeout(() => {
          logRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
        }, 50);
      } else {
        clearInterval(interval);
        setRunning(false);
        setDone(true);
      }
    }, 700);
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2.5rem" }}>
      {/* Header */}
      <div
        style={{
          paddingTop: "3rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "0.5rem" }}>
          Run Your Own Analysis
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>
          Ask a research question about Thucydides&rsquo; financial data
        </p>
      </div>

      <div style={{ paddingTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Question input */}
        <div>
          <label
            htmlFor="question"
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginBottom: "0.5rem",
            }}
          >
            Research Question
          </label>
          <textarea
            id="question"
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What was Athens' financial position after the Sicilian Expedition?"
            style={{ resize: "vertical" }}
          />
        </div>

        {/* API Key section */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <button
            onClick={() => setApiKeyExpanded(!apiKeyExpanded)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.875rem 1rem",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            <span>
              {apiKey ? (
                <span style={{ color: "var(--accent)" }}>✓ API Key set</span>
              ) : (
                "API Key"
              )}
            </span>
            <span
              style={{
                transform: apiKeyExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 150ms ease",
                display: "inline-block",
              }}
            >
              ▾
            </span>
          </button>

          {apiKeyExpanded && (
            <div
              style={{
                padding: "0 1rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Saphes uses Claude to analyze the data. Bring your own Anthropic
                API key.{" "}
                <a
                  href="https://console.anthropic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get a key →
                </a>
              </p>
              <div style={{ position: "relative" }}>
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  style={{ paddingRight: "4rem" }}
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-inter), sans-serif",
                    padding: 0,
                    width: "auto",
                  }}
                >
                  {showApiKey ? "Hide" : "Show"}
                </button>
              </div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  opacity: 0.7,
                }}
              >
                Your key is never sent to our servers. All API calls are made
                from your browser.
              </p>
            </div>
          )}
        </div>

        {/* Run button */}
        <button
          className="btn-gold-solid"
          onClick={handleRun}
          disabled={running || !question.trim()}
          style={{
            opacity: running || !question.trim() ? 0.5 : 1,
            cursor: running || !question.trim() ? "not-allowed" : "pointer",
          }}
        >
          {running ? "Running Analysis..." : "Run Analysis"}
        </button>

        {/* Status: no API key */}
        {!apiKey && !running && !done && (
          <div
            style={{
              padding: "1.25rem",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Analysis runs against cached Thucydides data. Enter your Anthropic
              API key to begin.
            </p>
          </div>
        )}

        {/* Terminal log */}
        {(log.length > 0 || running) && (
          <div
            ref={logRef}
            style={{
              backgroundColor: "#050a14",
              border: "1px solid var(--border)",
              padding: "1.25rem",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.8125rem",
              color: "#86efac",
              lineHeight: 1.8,
              maxHeight: "280px",
              overflowY: "auto",
            }}
          >
            {log.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            {running && (
              <div style={{ color: "var(--accent)" }}>
                <span
                  style={{
                    display: "inline-block",
                    animation: "pulse 1s infinite",
                  }}
                >
                  ▌
                </span>
              </div>
            )}
          </div>
        )}

        {/* Results (mock) */}
        {done && (
          <div
            className="fade-in"
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)", padding: "1.5rem" }}>
              <p className="section-label" style={{ marginBottom: "0.75rem" }}>
                Analysis
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                }}
              >
                This is where the Claude-generated analysis memo will appear.
                The API integration will synthesize the relevant extractions
                into a structured research memo addressing your question, with
                citations to specific Thucydides passages.
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  marginTop: "1rem",
                  opacity: 0.6,
                  fontStyle: "italic",
                }}
              >
                API integration coming soon. The interface is built and ready.
              </p>
            </div>

            <div
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
              }}
            >
              <p className="section-label" style={{ marginBottom: "0.75rem" }}>
                Relevant Data
              </p>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                }}
              >
                Filtered extractions matching your query will appear here as a
                sortable table.
              </p>
            </div>
          </div>
        )}
      </div>

      <div style={{ height: "4rem" }} />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
