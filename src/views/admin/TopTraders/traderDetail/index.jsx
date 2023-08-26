import React, { useMemo, useState } from "react";

// ProRIse imports
import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import BasicCard from "components/card/BasicCard";
import { buttonArray } from "constants/constants";
import { tabsArray } from "constants/constants";

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
import { getLeaderboardsData } from "store/actions";
import { columnsCopyTrade } from "views/admin/copyTrading/variables/columnsData";
import { userTradeHistory } from "views/admin/copyTrading/variables/columnsData";

// Custom components

export default function TraderDetails() {
  const dispatch = useDispatch();
  const { data, traderPositions, traderHistory, isLoading } = useSelector(
    (state) => state?.leaderBoard
  );

  const { exchangeConnection } = useSelector((state) => state?.exchange);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tabIndex, setTabIndex] = useState(0);

  const [capitalPercent, setCapitalPercent] = useState(null);
  const [balance, setBalance] = useState(0);
  const [traderFollow, setTraderFollow] = useState("Copier");

  const { id } = useParams();

  useEffect(() => {
    setAuthToken(localStorage.getItem("jwt"));
    dispatch(
      getTraderPositions({
        encryptedUid: id,
      })
    );

    apiInstance
      .post(`${PRO_RISE.isTraderFollowedByUser}`, {
        encryptedUid: id,
      })
      .then((res) => {
        setTraderFollow(res?.data?.traderFollow ? "unFolllow" : "Copier");
      });
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

  const updatedButtonArray = useMemo(() => {
    const newButtonArray = [...buttonArray]; // Create a copy of the original buttonArray

    buttonArray[2].title = traderFollow;

    if (filterData[0]?.favourite) {
      newButtonArray[1].title = "Supprimer des favoris";
    } else {
      newButtonArray[1].title = "Ajouter aux favoris";
    }
    return newButtonArray; // Return the updated buttonArray
  }, [filterData, traderFollow]);

  const onSubmit = async () => {
    const params = {
      capitalPercent: capitalPercent,
      encryptedUid: id,
    };

    try {
      await apiInstance.post(`${PRO_RISE.followTrader}`, params);
      toast.success("Successfully Follow This Trades List");
      setTraderFollow("unFolllow");
      onClose();
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
  };

  const onButtonAction = async (e) => {
    if (e === "Ajouter aux favoris" || e === "Supprimer des favoris") {
      try {
        await apiInstance.post(
          e === "Ajouter aux favoris"
            ? `${PRO_RISE.addFavTrader}`
            : `${PRO_RISE.unFavoriteTrader}`,
          {
            encryptedUid: id,
          }
        );
        toast.success(
          `Successfully ${
            e === "Ajouter aux favoris"
              ? "Add in favirate"
              : "Remove from favirate"
          }`
        );
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
      onOpen();
      const { data } = await apiInstance.post(`${PRO_RISE.getCapitalPercent}`);
      setCapitalPercent(data?.defaultCapitalPercent);
      apiInstance
        .post(`${PRO_RISE.getWalletBalance}`, {
          symbol: "USDT",
        })
        .then((res) =>
          setBalance(
            res?.data?.balance ? parseFloat(res?.data?.balance)?.toFixed(1) : 0
          )
        );
    }

    if (e === "unFolllow") {
      try {
        await apiInstance.post(`${PRO_RISE.unfollowTrader}`, {
          encryptedUid: id,
        });
        toast.success(` Successfully unFolllow Trade`);
        setTraderFollow("Copier");
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
    if (e === "Refresh") {
      refresh();
    }
  };

  return (
    <Box>
      <BasicCard
        heading={filterData[0]?.nickName}
        userImage={filterData[0]?.userPhotoUrl}
        table={tabIndex === 0 || tabIndex === 1 ? true : false}
        getTabIndex={(e) => setTabIndex(e)}
        buttonArray={updatedButtonArray}
        tabsArray={tabsArray}
        tableData={
          tabIndex === 0
            ? traderPositions ?? []
            : tabIndex === 1
            ? traderHistory
            : []
        }
        onButtonAction={onButtonAction}
        favorite={filterData[0]?.favorite}
        columnsData={
          tabIndex === 0
            ? columnsCopyTrade
            : tabIndex === 1
            ? userTradeHistory
            : null
        }
        isLoading={isLoading}
        exchangeConnection={exchangeConnection}
      >
        {tabIndex === 2 && (
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={2}
          >
            <GridItem colSpan={2}>
              <TotalSpent
                design={2}
                data={traderHistory ?? []}
                traderDetail={true}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <DailyTraffic
                currentPositions={traderHistory ?? []}
                traderDetail={true}
              />
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
        filterData={filterData[0] ?? {}}
        btnText={"Copier"}
        balance={balance}
      />
      <Footer />
    </Box>
  );
}
