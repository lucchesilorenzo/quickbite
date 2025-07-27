import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthRoutes } from "./AuthRoutes";
import { CustomerRoutes } from "./CustomerRoutes";
import { ErrorRoutes } from "./ErrorRoutes";
import Providers from "./Providers";
import { PublicRoutes } from "./PublicRoutes";

export default function AppRoutes() {
  return (
    <Router>
      <Providers>
        <Routes>
          {AuthRoutes}
          {PublicRoutes}
          {CustomerRoutes}
          {ErrorRoutes}
        </Routes>
      </Providers>
    </Router>
  );
}
