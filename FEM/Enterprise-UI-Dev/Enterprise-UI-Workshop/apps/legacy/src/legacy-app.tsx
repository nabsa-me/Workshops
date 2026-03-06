import React from "react";
import { LegacyAnalytics } from "./legacy-analytics";

export function LegacyApp(): React.ReactElement {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "24px", borderBottom: "1px solid #e5e7eb", paddingBottom: "16px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>Pulse (Legacy)</h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>Legacy analytics dashboard</p>
      </header>
      <main>
        <LegacyAnalytics />
      </main>
    </div>
  );
}
