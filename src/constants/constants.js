import { IoRefresh, IoShareSharp } from "react-icons/io5";
import { MdStar } from "react-icons/md";
import { BiCopy } from "react-icons/bi";

export const CLOSE = "close";
export const ALREADY_EMAIL = "Email is already register";
export const SUCCESS_REGISTER = "Successfully Register";
export const ALREADY_UESR = "Username is already register";
export const EMAIL = "email";
export const USERNAME = "username";
export const TARGET_ZERO = 0;

export const BASE_URL = "https://api.prorise.io/api/";

export const TradersCardData = Array.from({ length: 20 }, () => ({
  name: "lucky14",
  subheading: "2023-06-17T21:25:06.206Z",
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
  {
    title: "Partager",
    icon: IoShareSharp,
  },
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
