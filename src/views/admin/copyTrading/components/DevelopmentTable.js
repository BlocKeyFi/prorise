/* eslint-disable */
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import React from "react";

import GlobalTable from "components/Table/table";
import { CLOSE } from "constants/constants";
import apiInstance from "constants/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setAuthToken } from "constants/api";
// import { closePosition } from "store/actions";

export default function DevelopmentTable(props) {
  const { columnsData, tableData, tableHeading, p, bg } = props;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { exchangeConnection } = useSelector((state) => state.exchange);

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      bg={bg}
    >
      <Flex px="40px" justify="space-between" py={5} align="center">
        <Text
          color={textColor}
          fontSize="32px"
          fontWeight="600"
          lineHeight="100%"
        >
          {tableHeading}
        </Text>
      </Flex>

      <GlobalTable
        columnsData={columnsData}
        tableData={tableData}
        tableHeading={tableHeading}
        p={p}
        copyTrade={exchangeConnection}
        // onAction={onAction}
      />
    </Card>
  );
}
