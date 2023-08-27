export const columnsDataActiveTrades = [
  {
    Header: "DATE D’ENTREE",
    accessor: "createdTime",
  },
  {
    Header: "POSITION",
    accessor: "side",
  },
  {
    Header: "ORDER COIN",
    accessor: "symbol",
  },
  {
    Header: "PRIX D’ENTREE",
    accessor: "avgPrice",
  },
  {
    Header: "ROI",
    accessor: "liqPrice",
  },
  {
    Header: "LEVIER",
    accessor: "leverage",
  },
  {
    Header: "STATUS",
    accessor: "short",
  },
  {
    Header: "REDIRECT",
    accessor: "encryptedUid",
  },
];

export const columnsCopyTrade = [
  {
    Header: "DATE D’ENTREE",
    accessor: "updateTimeStamp",
  },
  {
    Header: "POSITION",
    accessor: "long",
  },
  {
    Header: "ORDER COIN",
    accessor: "symbol",
  },
  {
    Header: "PRIX D’ENTREE",
    accessor: "entryPrice",
  },
  {
    Header: "ROI",
    accessor: "roe",
  },
  {
    Header: "LEVIER",
    accessor: "leverage",
  },
  {
    Header: "STATUS",
    accessor: "short",
  },
];

export const columnsDataTradeHistory = [
  {
    Header: "DATE D’ENTREE",
    accessor: "createdTime",
  },
  {
    Header: "POSITION",
    accessor: "side",
  },
  {
    Header: "ORDER COIN",
    accessor: "symbol",
  },
  {
    Header: "PRIX D’ENTREE",
    accessor: "avgEntryPrice",
  },

  {
    Header: "PRIX DE SORTIE",
    accessor: "avgExitPrice",
  },
  {
    Header: "ROI",
    accessor: "closedPnl",
  },
  {
    Header: "LEVIER",
    accessor: "leverage",
  },
  {
    Header: "STATUS",
    accessor: "Status",
  },
  {
    Header: "DATE DE SORTIE",
    accessor: "updatedTime",
  },
];

export const columnsDataSponsorship = [
  {
    Header: "UTILISATEUR",
    accessor: "name",
  },
  {
    Header: "DATE",
    accessor: "subheading",
  },
  {
    Header: "RECOMPENSE",
    accessor: "textvalue2",
  },
];

export const columnsDataSponsorship2 = [
  {
    Header: "DATE",
    accessor: "subheading",
  },
  {
    Header: "MONTANT RECLAME",
    accessor: "textvalue2",
  },
];

export const columnsLeaderBoard = [
  {
    Header: "NOM DU TRADER",
    accessor: "nickName",
  },
  {
    Header: "EFFET DE LEVIER MOYEN",
    accessor: "rank",
  },
  {
    Header: "DRAWDOWN (PERTE MAX)",
    accessor: "followerCount",
  },
  {
    Header: "ROI",
    accessor: "roi",
  },
  {
    Header: "TRADE PAR JOUR",
    accessor: "winrate",
  },
  {
    Header: "ACTION",
    accessor: "",
  },
];

export const userTradeHistory = [
  {
    Header: "DATE DE SORTIE",
    accessor: "updateTimeStamp",
  },
  {
    Header: "POSITION",
    accessor: "side",
  },
  {
    Header: "ORDER COIN",
    accessor: "symbol",
  },
  {
    Header: "PRIX D’ENTREE",
    accessor: "entryPrice",
  },

  {
    Header: "PRIX DE SORTIE",
    accessor: "markPrice",
  },
  {
    Header: "ROI",
    accessor: "roe",
  },
  {
    Header: "LEVIER",
    accessor: "leverage",
  },
  {
    Header: "STATUS",
    accessor: "Status",
  },
];
