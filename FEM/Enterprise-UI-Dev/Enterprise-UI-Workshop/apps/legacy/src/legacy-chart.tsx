import React from "react";

interface ChartDataPoint {
  date: string;
  value: number;
}

export function LegacyChart({ data }: { data: ChartDataPoint[] }): React.ReactElement {
  if (data.length === 0) {
    return (
      <div style={{ height: "256px", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
        No data available
      </div>
    );
  }

  const maxValue = Math.max(...data.map((point) => point.value));
  const chartHeight = 200;
  const chartWidth = 800;
  const barWidth = Math.max(4, (chartWidth - data.length * 2) / data.length);
  const gap = 2;

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
      style={{ width: "100%", height: "256px" }}
      role="img"
      aria-label="Analytics activity chart"
    >
      {data.map((point, index) => {
        const barHeight = (point.value / maxValue) * chartHeight;
        const x = index * (barWidth + gap);
        const y = chartHeight - barHeight;

        return (
          <g key={point.date}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#1f2937"
              rx={2}
            />
            {index % Math.ceil(data.length / 6) === 0 && (
              <text
                x={x + barWidth / 2}
                y={chartHeight + 16}
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="10"
              >
                {point.date.slice(5)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
