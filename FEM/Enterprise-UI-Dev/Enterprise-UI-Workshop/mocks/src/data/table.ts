import type { TableRow } from "@pulse/shared";

const actions = [
  "page_view",
  "button_click",
  "form_submit",
  "file_upload",
  "report_export",
];

const users = [
  { name: "Grace Hopper", email: "grace@pulse.dev" },
  { name: "Alan Turing", email: "alan@pulse.dev" },
  { name: "Ada Lovelace", email: "ada@pulse.dev" },
  { name: "Linus Torvalds", email: "linus@pulse.dev" },
  { name: "Margaret Hamilton", email: "margaret@pulse.dev" },
];

function generateTableData(): TableRow[] {
  const rows: TableRow[] = [];
  const baseDate = new Date("2025-01-15T08:00:00Z");

  for (let i = 0; i < 50; i++) {
    const date = new Date(baseDate);
    date.setMinutes(date.getMinutes() + i * 17);

    const userIndex = i % users.length;
    const actionIndex = i % actions.length;

    rows.push({
      id: `row_${String(i + 1).padStart(3, "0")}`,
      user: users[userIndex].name,
      email: users[userIndex].email,
      action: actions[actionIndex],
      timestamp: date.toISOString(),
      duration: 100 + ((i * 73) % 900),
    });
  }

  return rows;
}

const tableData = generateTableData();

export function getTablePage(
  page: number,
  pageSize: number = 10,
): { data: TableRow[]; total: number; page: number; pageSize: number } {
  const start = (page - 1) * pageSize;
  return {
    data: tableData.slice(start, start + pageSize),
    total: tableData.length,
    page,
    pageSize,
  };
}
