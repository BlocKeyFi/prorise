import React from "react";

// Admin Imports
import MainDashboard from "views/admin/dashboard";
import TopTraders from "views/admin/TopTraders";
import SponsorShip from "views/admin/sponsorship";
import Analytics from "views/admin/analytics";
import CopyTrading from "views/admin/copyTrading";

// Onboarding Imports
import OnboardingCentered from "views/auth/onboarding";
import profile from "./assets/img/dashboards/svgIcon/Frame 427319644.png";
import dashboard from "./assets/img/dashboards/svgIcon/grid.svg";
import topTrand from "./assets/img/dashboards/svgIcon/users.svg";
import copy from "./assets/img/dashboards/svgIcon/copy.svg";
import Analytiques from "./assets/img/dashboards/svgIcon/circle-chart-1.svg";
import shear from "./assets/img/dashboards/svgIcon/share.svg";
import setting from "./assets/img/dashboards/svgIcon/Settings.svg";
import support from "./assets/img/dashboards/svgIcon/World.svg";
import Settings from "views/admin/settings";
import TraderDetails from "views/admin/TopTraders/traderDetail";
import Login from "views/auth/login";
import Verification from "views/auth/verification/verification";
import SendVerification from "views/auth/verification/sendVerification";

const routes = [
  {
    name: "Tableau de bord",
    layout: "/admin",
    path: "/dashboard",
    icon: <img src={dashboard} />,
    component: MainDashboard,
  },
  {
    name: "Top traders",
    layout: "/admin",
    path: "/top-traders",
    icon: <img src={topTrand} />,
    component: TopTraders,
    secondary: true,
  },
  {
    name: "Copy trading",
    layout: "/admin",
    icon: <img src={copy} />,
    path: "/copy-trading",
    component: CopyTrading,
  },
  {
    name: "Analytiques",
    layout: "/admin",
    path: "/analytics",
    icon: <img src={Analytiques} />,
    component: Analytics,
  },
  {
    name: "Parrainage",
    layout: "/admin",
    path: "/sponsorship",
    icon: <img src={shear} />,
    component: SponsorShip,
  },
  {
    name: "userName",
    layout: "/admin",
    path: "/profile1",
    icon: <img src={profile} />,
    component: MainDashboard,
  },
  {
    name: "Réglages",
    layout: "/admin",
    path: "/setting",
    icon: <img src={setting} />,
    component: Settings,
  },
  {
    name: "Support",
    layout: "/admin",
    path: "/support",
    icon: <img src={support} />,
    component: MainDashboard,
  },
  {
    layout: "/auth",
    path: "/onboarding",
    component: OnboardingCentered,
  },
  {
    layout: "/auth",
    path: "/login",
    component: Login,
  },
  {
    layout: "/auth",
    path: "/verification",
    component: Verification,
  },
  {
    layout: "/auth",
    path: "/send-verification",
    component: SendVerification,
  },
  {
    name: "Top traders",
    layout: "/admin",
    path: "/trader-detail/:id",
    component: TraderDetails,
  },
];

export default routes;
