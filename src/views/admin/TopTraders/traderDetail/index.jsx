import React, { useState } from "react";

// ProRIse imports
import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import BasicCard from "components/card/BasicCard";
import { buttonArray } from "constants/constants";
import { tabsArray } from "constants/constants";

import user from "../../../../assets/img/dashboards/Profile.png";
import TotalSpent from "views/admin/dashboard/components/TotalSpent";
import DailyTraffic from "views/admin/dashboard/components/ActiveTraders";
import Footer from "components/footer/FooterAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTraderPositions } from "store/actions";
import apiInstance from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import { setAuthToken } from "constants/api";
import { toast } from "react-hot-toast";
import Dialog from "components/dialog/Dialog";
import { CLOSE } from "constants/constants";
import { closePosition } from "store/actions";
import { getLeaderboardsData } from "store/actions";

// Custom components

export default function TraderDetails() {
  const dispatch = useDispatch();
  const { data, traderPositions } = useSelector((state) => state?.leaderBoard);
  const { exchangeConnection } = useSelector((state) => state?.exchange);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tabIndex, setTabIndex] = useState(false);

  const [capitalPercent, setCapitalPercent] = useState(0);
  const [selectedTrade, setSelectedTrade] = useState({});

  const { id } = useParams();

  useEffect(() => {
    dispatch(
      getTraderPositions({
        encryptedUid: id,
      })
    );
  }, [id]);

  const refresh = () => {
    dispatch(
      getTraderPositions({
        encryptedUid: id,
      })
    );

    dispatch(
      getLeaderboardsData({
        searchCriteria: {
          period: "WEEKLY",
          currentPage: 1,
        },
      })
    );
  };

  const filterData = data.filter((item) => item.encryptedUid === id);

  const onAllCopy = async () => {
    onOpen();
    setSelectedTrade({});
  };

  const onAction = async (e, action) => {
    if (action === CLOSE) {
      const params = {
        exchange: exchangeConnection,
        positionsToClose: [e],
      };
      dispatch(closePosition(params));
    } else {
      onOpen();
      setSelectedTrade(e);
    }
  };

  const onSubmit = async () => {
    const params = {
      capitalPercent: capitalPercent,
      exchange: exchangeConnection,
      traderPositions: selectedTrade.symbol ? [selectedTrade] : traderPositions,
    };

    try {
      setAuthToken(localStorage.getItem("jwt"));
      await apiInstance.post(`${PRO_RISE.copyTrade}`, params);
      toast.success(
        selectedTrade.symbol
          ? "Successfully Copy Trade"
          : "Successfully Copy Trades List"
      );
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onButtonAction = async (e) => {
    if (e === "Ajouter aux favoris") {
      try {
        setAuthToken(localStorage.getItem("jwt"));
        await apiInstance.post(`${PRO_RISE.addFavTrader}`, {
          encryptedUid: id,
        });
        toast.success("Successfully Add in favirate");
        dispatch(
          getLeaderboardsData({
            searchCriteria: {
              period: "WEEKLY",
              currentPage: 1,
            },
          })
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
    if (e === "Copier") {
      onAllCopy();
    }
    if (e === "Refresh") {
      refresh();
    }
  };

  return (
    <Box>
      <BasicCard
        heading={filterData[0]?.nickName}
        userImage={user}
        table={tabIndex === "2" ? false : true}
        getTabIndex={(e) => setTabIndex(e)}
        buttonArray={buttonArray}
        tabsArray={tabsArray}
        traderPositions={traderPositions ?? []}
        onAction={onAction}
        onButtonAction={onButtonAction}
        favorite={filterData[0]?.favorite}
      >
        {tabIndex === "2" && (
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={2}
          >
            <GridItem colSpan={2}>
              <TotalSpent design={2} />
            </GridItem>
            <GridItem colSpan={1}>
              <DailyTraffic />
            </GridItem>
          </Grid>
        )}
      </BasicCard>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        heading={`Paramètres du copiage`}
        capitalPercent={capitalPercent}
        setCapitalPercent={setCapitalPercent}
        connection={false}
        filterData={filterData}
      />
      <Footer />
    </Box>
  );
}
