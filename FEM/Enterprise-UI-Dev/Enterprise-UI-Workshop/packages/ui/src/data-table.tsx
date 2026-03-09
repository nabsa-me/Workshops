import React from "react";

interface Column<T> {
  key: keyof T & string;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T & string;
}

export function DataTable<T>({
  columns,
  data,
  keyField,
}: DataTableProps<T>): React.ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 font-medium text-gray-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={String(row[keyField])}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-gray-900">
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
