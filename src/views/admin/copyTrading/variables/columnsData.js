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
