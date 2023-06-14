import { IoShareSharp } from "react-icons/io5";
import { MdStar } from "react-icons/md";
import { BiCopy } from "react-icons/bi";

export const TradersCardData = Array.from({ length: 20 }, () => ({
  name: "lucky14",
  subheading: "Il ya 11 jours",
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
