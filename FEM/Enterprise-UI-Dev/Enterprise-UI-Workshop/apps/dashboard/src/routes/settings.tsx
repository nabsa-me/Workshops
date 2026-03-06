import React, { useEffect, useState } from "react";
import type { OrgSettings } from "@pulse/shared";
import { Card } from "@pulse/ui";

export default function SettingsRoute(): React.ReactElement {
  const [settings, setSettings] = useState<OrgSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings(): Promise<void> {
      try {
        const response = await fetch("/api/settings");
        const data: OrgSettings = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
        Failed to load settings.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Settings</h2>

      <Card title="Organization">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-gray-900">{settings.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Plan</p>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              {settings.plan}
            </span>
          </div>
        </div>
      </Card>

      <Card title="Features">
        <ul className="space-y-2">
          {settings.features.map((feature) => (
            <li key={feature} className="text-sm text-gray-700">
              {feature}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
