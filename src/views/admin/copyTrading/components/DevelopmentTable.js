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

export default function DevelopmentTable(props) {
  const { columnsData, tableData, tableHeading, slice, p, bg } = props;

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      bg={bg}
    >
      <Flex px="40px" justify="space-between" mb="20px" align="center">
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
        slice={slice}
        p={p}
      />
    </Card>
  );
}
