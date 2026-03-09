import { http, HttpResponse, delay } from "msw";
import type { TimeRange } from "@pulse/shared";
import { summaryData } from "./data/summary";
import { chartData7d, chartData30d, chartData90d } from "./data/chart";
import { getTablePage } from "./data/table";
import { currentUser, usersData } from "./data/users";

const chartDataByRange: Record<TimeRange, typeof chartData30d> = {
  "7d": chartData7d,
  "30d": chartData30d,
  "90d": chartData90d,
};

const settingsData = {
  name: "Pulse Inc.",
  plan: "pro" as const,
  features: ["analytics", "user-management", "api-access", "custom-reports"],
};

export const handlers = [
  // Analytics
  http.get("/api/analytics/summary", async () => {
    await delay(200);
    return HttpResponse.json(summaryData);
  }),

  http.get("/api/analytics/chart", async ({ request }) => {
    await delay(800);
    const url = new URL(request.url);
    const range = (url.searchParams.get("range") ?? "30d") as TimeRange;
    return HttpResponse.json(chartDataByRange[range]);
  }),

  http.get("/api/analytics/table", async ({ request }) => {
    await delay(2000);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    return HttpResponse.json(getTablePage(page));
  }),

  // Users — /me must come before /:id to avoid param collision
  http.get("/api/users/me", async () => {
    await delay(100);
    return HttpResponse.json(currentUser);
  }),

  http.get("/api/users/:id", async ({ params }) => {
    await delay(300);
    const user = usersData.find((u) => u.id === params.id);
    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(user);
  }),

  http.get("/api/users", async () => {
    await delay(400);
    return HttpResponse.json(usersData);
  }),

  http.post("/api/users/invite", async () => {
    await delay(500);
    return HttpResponse.json({ success: true });
  }),

  // Settings
  http.get("/api/settings", async () => {
    await delay(200);
    return HttpResponse.json(settingsData);
  }),
];
