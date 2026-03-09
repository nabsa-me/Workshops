import React, { useEffect, useState } from "react";
import { LegacyChart } from "./legacy-chart";

interface SummaryStats {
  totalUsers: number;
  activeToday: number;
  revenue: number;
  conversionRate: number;
}

interface ChartDataPoint {
  date: string;
  value: number;
}

export function LegacyAnalytics(): React.ReactElement {
  const [summary, setSummary] = useState<SummaryStats | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const [summaryResponse, chartResponse] = await Promise.all([
          fetch("/api/analytics/summary"),
          fetch("/api/analytics/chart?range=30d"),
        ]);

        const summaryResult: SummaryStats = await summaryResponse.json();
        const chartResult: ChartDataPoint[] = await chartResponse.json();

        setSummary(summaryResult);
        setChartData(chartResult);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ padding: "48px", textAlign: "center", color: "#9ca3af" }}>Loading...</div>;
  }

  return (
    <div>
      {summary && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "white" }}>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Total Users</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>
              {summary.totalUsers.toLocaleString()}
            </div>
          </div>
          <div style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "white" }}>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Active Today</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>
              {summary.activeToday.toLocaleString()}
            </div>
          </div>
          <div style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "white" }}>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Revenue</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>
              ${summary.revenue.toLocaleString()}
            </div>
          </div>
          <div style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "white" }}>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Conversion Rate</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>
              {(summary.conversionRate * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", background: "white", padding: "24px" }}>
        <h3 style={{ fontWeight: 500, color: "#111827", marginBottom: "16px" }}>Activity</h3>
        <LegacyChart data={chartData} />
      </div>
    </div>
  );
}
