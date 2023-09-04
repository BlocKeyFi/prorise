import { IoRefresh, IoShareSharp } from "react-icons/io5";
import { MdStar } from "react-icons/md";
import { BiCopy } from "react-icons/bi";

import { FcGoogle } from "react-icons/fc";

import Binance from "assets/img/dashboards/svgIcon/Binance.svg";
import ByBit from "assets/img/dashboards/svgIcon/Bybit.svg";
import KuCoin from "assets/img/dashboards/svgIcon/KuCoin.svg";

export const CLOSE = "close";
export const ALREADY_EMAIL = "Email is already register";
export const SUCCESS_REGISTER = "Successfully Register";
export const ALREADY_UESR = "Username is already register";
export const EMAIL = "email";
export const USERNAME = "username";
export const TARGET_ZERO = 0;
export const TOKEN = "token";

export const BASE_URL = "https://api.prorise.io/api/";

export const TradersCardData = Array.from({ length: 5 }, () => ({
  name: "lucky14",
  subheading: 1549312452,
  text1: "ROI 7 jours",
  textvalue1: "20.60 %",
  text2: "Win rate 7 jours",
  textvalue2: "30.60 %",
  copyCount: 89,
  copyText: "ont copié ce trade",
  isCopy: false,
  isStar: false,
}));

export const buttonArray = [
  // {
  //   title: "Partager",
  //   icon: IoShareSharp,
  // },
  {
    title: "Ajouter aux favoris",
    icon: MdStar,
  },
  {
    title: "Copier",
    icon: BiCopy,
  },
  {
    title: "Refresh",
    icon: IoRefresh,
  },
];

export const selectTimeDuration = [
  {
    title: "Trier par : 7 jours",
    value: "WEEKLY",
  },
  {
    title: "Trier par : 30 jours",
    value: "MONTHLY",
  },
  // {
  //   title: "Trier par : 3 mois",
  //   value: "3 MONTHS",
  // },
  // {
  //   title: "Trier par :  6 mois",
  //   value: "6 MONTHS",
  // },
  // {
  //   title: "Trier par : 1 année",
  //   value: "YEARLY",
  // },
];

export const tabsArray = [
  {
    id: 0,
    title: "Trades actifs",
  },
  {
    id: 1,
    title: "Historique des trades",
  },
  {
    id: 2,
    title: "Statistiques",
  },
];

export const pakageSilver = [
  "Top 3 traders",
  "Fonction copy trading",
  "Gestion du risque",
  "Analytiques",
  "Statistiques des top traders",
  "Support WhatsApp 24/7",
  "Programme de référence",
];

export const pakageGold = [
  "Top 5 traders",
  "Fonction copy trading",
  "Gestion du risque",
  "Analytiques",
  "Statistiques des top traders",
  "Support WhatsApp 24/7",
  "Programme de référence",
];

export const pakagePlatinum = [
  "Leaderboard Binance complet",
  "Fonction copy trading",
  "Gestion du risque",
  "Analytiques",
  "Statistiques des top traders",
  "Support WhatsApp 24/7",
  "Programme de référence",
];

export const pakageDetails = (e) => {
  if (e === "pakageSilver") {
    return pakageSilver;
  } else if (e === "pakageGold") {
    return pakageGold;
  } else if (e === "pakagePlatinum") {
    return pakagePlatinum;
  }
};

export const authButtons = [
  {
    title: "google",
    icon: FcGoogle,
  },
  // {
  //   title: "facbook",
  //   icon: "",
  // },
  // {
  //   title: "apple",
  //   icon: "",
  // },
];

export const connetions = [
  {
    title: "Binance",
    icon: Binance,
  },
  {
    title: "ByBit",
    icon: ByBit,
  },
  {
    title: "BitGet",
    icon: "https://altcoinsbox.com/wp-content/uploads/2023/04/bitget-logo.png",
  },
];

export const settingsTab = [
  { name: "Profil" },
  { name: "Connexion API" },
  { name: "Notifications" },
  { name: "Facturation et abonnement" },
  ,
];

export const selectValue = (name) => {
  return [
    {
      title: `${name} : 7 jours`,
      value: "7",
    },
    {
      title: `${name} : 15 jours`,
      value: "15",
    },
    {
      title: `${name} : 30 jours`,
      value: "30",
    },
  ];
};
