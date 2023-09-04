import React, { lazy } from "react";

import profile from "./assets/img/dashboards/svgIcon/Frame 427319644.png";
import dashboard from "./assets/img/dashboards/svgIcon/grid.svg";
import topTrand from "./assets/img/dashboards/svgIcon/users.svg";
import copy from "./assets/img/dashboards/svgIcon/copy.svg";
import Analytiques from "./assets/img/dashboards/svgIcon/circle-chart-1.svg";
import shear from "./assets/img/dashboards/svgIcon/share.svg";
import setting from "./assets/img/dashboards/svgIcon/Settings.svg";
import support from "./assets/img/dashboards/svgIcon/World.svg";
import Leaderboard from "./assets/img/dashboards/svgIcon/presentation-chart-1.svg";

// Admin Imports
const MainDashboard = lazy(() => import("views/admin/dashboard"));
const TopTraders = lazy(() => import("views/admin/TopTraders"));
const SponsorShip = lazy(() => import("views/admin/sponsorship"));
const CopyTrading = lazy(() => import("views/admin/copyTrading"));
const LeaderBoard = lazy(() => import("views/admin/leaderBoard"));
const ForgotPassword = lazy(() => import("views/auth/forgotPassword"));
const Support = lazy(() => import("views/admin/support"));
const Login = lazy(() => import("views/auth/login"));
const OnboardingCentered = lazy(() => import("views/auth/onboarding"));
const Settings = lazy(() => import("views/admin/settings"));
const TraderDetails = lazy(() => import("views/admin/TopTraders/traderDetail"));
const Verification = lazy(() => import("views/auth/verification/verification"));
const SendVerification = lazy(() =>
  import("views/auth/verification/sendVerification")
);

// Onboarding Imports

const routes = [
  {
    name: "Tableau de bord",
    layout: "/admin",
    path: "/dashboard",
    icon: <img src={dashboard} />,
    component: MainDashboard,
    primary: true,
  },
  {
    name: "Top traders",
    layout: "/admin",
    path: "/top-traders",
    icon: <img src={topTrand} />,
    component: TopTraders,
    primary: true,
  },
  {
    name: "Leaderboard",
    layout: "/admin",
    path: "/leaderboard",
    icon: <img src={Leaderboard} />,
    component: LeaderBoard,
    primary: true,
  },
  {
    name: "Copy trading",
    layout: "/admin",
    icon: <img src={copy} />,
    path: "/copy-trading",
    component: CopyTrading,
    primary: true,
  },
  // {
  //   name: "Analytiques",
  //   layout: "/admin",
  //   path: "/analytics",
  //   icon: <img src={Analytiques} />,
  //   component: Analytics,
  // },
  {
    name: "Parrainage",
    layout: "/admin",
    path: "/sponsorship",
    icon: <img src={shear} />,
    component: SponsorShip,
    primary: true,
  },
  // {
  //   name: "userName",
  //   layout: "/admin",
  //   path: "/profile1",
  //   icon: <img src={profile} />,
  //   component: MainDashboard,
  // },
  {
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
    component: Support,
    primary: true,
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
    path: "/forgot-password",
    component: ForgotPassword,
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
