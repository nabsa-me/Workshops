import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({
  title,
  children,
  className = "",
}: CardProps): React.ReactElement {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 ${className}`}
    >
      {title && <h3 className="mb-4 font-medium text-gray-900">{title}</h3>}
      {children}
    </div>
  );
}
