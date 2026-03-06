import React, { useEffect, useState } from "react";
import type { User } from "@pulse/shared";
import { DataTable, LoadingSkeleton } from "@pulse/ui";

export function UserList(): React.ReactElement {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      try {
        const response = await fetch("/api/users");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <LoadingSkeleton variant="table" />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Users</h2>
      <div className="rounded-lg border border-gray-200 bg-white">
        <DataTable
          columns={[
            { key: "name", header: "Name" },
            { key: "email", header: "Email" },
            {
              key: "role",
              header: "Role",
              render: (value) => (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  {String(value)}
                </span>
              ),
            },
          ]}
          data={users}
          keyField="id"
        />
      </div>
    </div>
  );
}
