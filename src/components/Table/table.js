import React, { useMemo } from "react";
/* eslint-disable */
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Spinner,
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
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { timeConverter } from "utils/utils";
import { CLOSE } from "constants/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function GlobalTable(props) {
  const { columnsData, tableData, p } = props;

  const { errorMessage, isLoading } = useSelector(
    (state) => state?.leaderBoard
  );

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 15;

  const textColor = useColorModeValue("secondaryGray.900", "white");

  if (errorMessage && isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={p ? p : 0}>
      {page.length ? (
        <TableContainer>
          <Table {...getTableProps()} variant="simple" color="gray.500">
            <Thead>
              {headerGroups?.map((headerGroup, index) => (
                <Tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={index}
                  bg={"purpul.200"}
                  textAlign={"center"}
                >
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      pe="10px"
                      key={index}
                      fontFamily="Urbanist"
                      fontSize={"14px"}
                      border={"none"}
                      w={"100%"}
                    >
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page?.map((row, index) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} key={index}>
                    {row?.cells?.map((cell, index) => {
                      let data = "";
                      if (cell.column.Header === "DATE D’ENTREE") {
                        const date = timeConverter(cell.value);
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {date}
                          </Text>
                        );
                      } else if (cell.column.Header === "POSITION") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value ? "buy" : "sell"}
                          </Text>
                        );
                      } else if (cell.column.Header === "ORDER COIN") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value}
                          </Text>
                        );
                      } else if (cell.column.Header === "PRIX D’ENTREE") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value}
                          </Text>
                        );
                      } else if (cell.column.Header === "PRIX DE SORTIE") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value}
                          </Text>
                        );
                      } else if (cell.column.Header === "ROI") {
                        data = (
                          <Text
                            color={cell?.value < 0 ? "red" : "green.300"}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value}
                          </Text>
                        );
                      } else if (cell.column.Header === "LEVIER") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value}
                          </Text>
                        );
                      } else if (cell.column.Header === "STATUS") {
                        data = (
                          <Text
                            color={!cell.value ? "green.300" : "red"}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {!cell.value ? "Profit" : "Loss"}
                          </Text>
                        );
                      } else if (cell.column.Header === "DATE DE SORTIE") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value}
                          </Text>
                        );
                      }
                      return (
                        <Td
                          {...cell.getCellProps()}
                          key={index}
                          fontSize={{ sm: "14px", xl: "16px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          borderColor="transparent"
                        >
                          {data}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Center>
          {!props?.copyTrade ? (
            <Text fontSize={20}>
              No Connection Found
              <br />
              <br />
              <Link to="/admin/setting" style={{ width: "100%" }}>
                <Button
                  fontSize="16px"
                  variant="brand"
                  fontWeight="500"
                  w={"100%"}
                  h="35px"
                  bg="#0075FF"
                  borderRadius="10px"
                  _hover={{ bg: "#0075FF" }}
                  textAlign={"center"}
                  gap={2}
                >
                  {"Build Connection"}
                </Button>
              </Link>
            </Text>
          ) : (
            <Text fontSize={30}>{"No Data Found"}</Text>
          )}
        </Center>
      )}
    </Box>
  );
}
