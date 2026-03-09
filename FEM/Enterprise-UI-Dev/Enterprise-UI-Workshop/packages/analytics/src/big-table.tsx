import React from "react";
import type { TableRow } from "@pulse/shared";
import { DataTable } from "@pulse/ui";

const columns = [
  { key: "user" as const, header: "User" },
  { key: "action" as const, header: "Action" },
  {
    key: "timestamp" as const,
    header: "Time",
    render: (value: TableRow[keyof TableRow]) =>
      new Date(String(value)).toLocaleString(),
  },
  {
    key: "duration" as const,
    header: "Duration",
    render: (value: TableRow[keyof TableRow]) => `${value}ms`,
  },
];

export function BigTable({
  data,
}: {
  data: TableRow[];
}): React.ReactElement {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 font-medium text-gray-900">Recent Activity</h3>
      <DataTable columns={columns} data={data} keyField="id" />
    </div>
  );
}
