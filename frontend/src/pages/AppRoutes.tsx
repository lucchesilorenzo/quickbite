import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthRoutes } from "./AuthRoutes";
import { CustomerRoutes } from "./CustomerRoutes";
import { ErrorRoutes } from "./ErrorRoutes";
import { PartnerRoutes } from "./PartnerRoutes";
import Providers from "./Providers";
import { PublicRoutes } from "./PublicRoutes";
import { RiderRoutes } from "./RiderRoutes";
import VerifyEmail from "./private/guards/VerifyEmail";

export default function AppRoutes() {
  return (
    <Router>
      <Providers>
        <Routes>
          <Route element={<VerifyEmail />}>
            {AuthRoutes}
            {PublicRoutes}
            {CustomerRoutes}
            {PartnerRoutes}
            {RiderRoutes}
          </Route>

          {ErrorRoutes}
        </Routes>
      </Providers>
    </Router>
  );
}
