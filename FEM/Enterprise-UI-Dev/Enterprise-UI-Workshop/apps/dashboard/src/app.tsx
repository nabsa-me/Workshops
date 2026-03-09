import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./shell/auth-provider";
import { Layout } from "./shell/layout";
import { LoadingSkeleton } from "@pulse/ui";

const Analytics = lazy(() => import("./routes/analytics"));
const Settings = lazy(() => import("./routes/settings"));
const Users = lazy(() => import("./routes/users"));

export function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Suspense fallback={<LoadingSkeleton variant="page" />}>
            <Routes>
              <Route path="/" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
