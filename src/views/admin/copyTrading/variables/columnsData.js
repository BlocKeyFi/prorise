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
    accessor: "unrealisedPnl",
  },
  {
    Header: "LEVIER",
    accessor: "leverage",
  },
  {
    Header: "PNL AMOUNT",
    accessor: "cumRealisedPnl",
  },
  {
    Header: "VOIR LE TRADER",
    accessor: "trader",
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
    Header: "PNL AMOUNT",
    accessor: "cumEntryValue",
  },
  {
    Header: "DATE DE SORTIE",
    accessor: "updatedTime",
  },
  {
    Header: "VOIR LE TRADER",
    accessor: "trader",
  },
];

export const columnsDataSponsorship = [
  {
    Header: "UTILISATEUR",
    accessor: "username",
  },
  {
    Header: "DATE",
    accessor: "created_at",
  },
  {
    Header: "RECOMPENSE",
    accessor: "id",
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
    Header: "WIN RATE",
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
