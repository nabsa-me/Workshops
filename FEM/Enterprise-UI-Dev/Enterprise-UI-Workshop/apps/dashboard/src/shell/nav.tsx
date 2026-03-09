import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@pulse/shared";

const navItems = [
  { to: "/", label: "Analytics" },
  { to: "/users", label: "Users" },
  { to: "/settings", label: "Settings" },
];

export function Nav(): React.ReactElement {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="space-y-2 px-4">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            `block rounded-md px-3 py-2 text-sm font-medium ${
              isActive
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
      <div className="mt-8 border-t border-gray-200 pt-4">
        {isAuthenticated && user ? (
          <div className="px-3">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        ) : (
          <div className="px-3 text-sm text-gray-400">Not signed in</div>
        )}
      </div>
    </nav>
  );
}
