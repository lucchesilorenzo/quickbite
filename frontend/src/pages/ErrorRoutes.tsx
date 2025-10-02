import { Route } from "react-router-dom";

import ErrorPage from "./public/ErrorPage";

import ErrorLayout from "@/layouts/public/ErrorLayout";

export const ErrorRoutes = [
  <Route path="/" element={<ErrorLayout />}>
    <Route path="*" element={<ErrorPage />} />
  </Route>,
];
