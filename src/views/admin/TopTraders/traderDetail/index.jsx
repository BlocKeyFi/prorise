import React, { useMemo, useState } from "react";

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
import { getLeaderboardsData } from "store/actions";
import { columnsCopyTrade } from "views/admin/copyTrading/variables/columnsData";
import { columnsDataTradeHistory } from "views/admin/copyTrading/variables/columnsData";
import tableDataDevelopment from "views/admin/copyTrading/variables/tableDataDevelopment.json";

// Custom components

export default function TraderDetails() {
  const dispatch = useDispatch();
  const { data, traderPositions, isLoading } = useSelector(
    (state) => state?.leaderBoard
  );
  const { exchangeConnection } = useSelector((state) => state?.exchange);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tabIndex, setTabIndex] = useState(0);

  const [capitalPercent, setCapitalPercent] = useState(null);
  // const [selectedTrade, setSelectedTrade] = useState({});

  const { id } = useParams();

  useEffect(() => {
    setAuthToken(localStorage.getItem("jwt"));
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

  const updatedButtonArray = useMemo(() => {
    const newButtonArray = [...buttonArray]; // Create a copy of the original buttonArray

    const fetchData = async () => {
      try {
        const { data } = await apiInstance.post(
          `${PRO_RISE.isTraderFollowedByUser}`,
          {
            encryptedUid: id,
          }
        );

        if (data.traderFollow) {
          newButtonArray[2].title = "unFolllow";
        } else {
          newButtonArray[2].title = "Copier";
        }
        // toast.success("Successfully Follow This Trades List");
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();

    if (filterData[0].favorite) {
      newButtonArray[1].title = "Supprimer des favoris";
    } else {
      newButtonArray[1].title = "Ajouter aux favoris";
    }
    return newButtonArray; // Return the updated buttonArray
  }, [filterData]);

  const onSubmit = async () => {
    const params = {
      capitalPercent: capitalPercent,
      encryptedUid: id,
    };

    try {
      await apiInstance.post(`${PRO_RISE.followTrader}`, params);
      toast.success("Successfully Follow This Trades List");
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
      const { data } = await apiInstance.post(`${PRO_RISE.getCapitalPercent}`);
      setCapitalPercent(data?.defaultCapitalPercent);
      onOpen();
    }

    if (e === "unFolllow") {
      try {
        await apiInstance.post(`${PRO_RISE.unfollowTrader}`, {
          encryptedUid: id,
        });
        toast.success(` Successfully unFolllow Trade`);
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
          tabIndex === 0 ? traderPositions ?? [] : tabIndex === 1 ? [] : []
        }
        onButtonAction={onButtonAction}
        favorite={filterData[0]?.favorite}
        columnsData={
          tabIndex === 0
            ? columnsCopyTrade
            : tabIndex === 1
            ? columnsDataTradeHistory
            : null
        }
        isLoading={isLoading}
      >
        {tabIndex === 2 && (
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={2}
          >
            <GridItem colSpan={2}>
              <TotalSpent design={2} />
            </GridItem>
            <GridItem colSpan={1}>
              <DailyTraffic
                currentPositions={traderPositions ?? []}
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
        filterData={filterData}
      />
      <Footer />
    </Box>
  );
}
