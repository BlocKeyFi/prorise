import React, { useMemo } from "react";
/* eslint-disable */
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Image,
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

import copy from "../../assets/img/dashboards/svgIcon/copy-fill.svg";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export default function GlobalTable(props) {
  const { columnsData, tableData, p, isLoading, onCopy } = props;

  const { exchangeConnection } = useSelector((state) => state?.exchange);

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
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = tableInstance;
  initialState.pageSize = 10;
  initialState.pageIndex = 0;

  const textColor = useColorModeValue("secondaryGray.900", "white");

  let iconColor = useColorModeValue("secondaryGray.900", "white");
  let activeTextColor = useColorModeValue("secondaryGray.900", "white");
  let activebgColor = useColorModeValue("secondaryGray.900", "#0c0d22");
  let activeIconColor = useColorModeValue("secondaryGray.900", "#0c0d22");

  if (isLoading) {
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
                      fontSize={{
                        "2xl": "14px",
                        xl: "12px",
                        lg: "12px",
                        md: "12px",
                        sm: "10px",
                      }}
                      border={"none"}
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
                            {cell?.row?.original?.side
                              ? cell?.row?.original?.side
                              : cell.value
                              ? "Buy"
                              : "Sell"}
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
                      } else if (
                        cell.column.Header === "DRAWDOWN (PERTE MAX)"
                      ) {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value}
                          </Text>
                        );
                      } else if (cell.column.Header === "TRADE PAR JOUR") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value}
                          </Text>
                        );
                      } else if (
                        cell.column.Header === "EFFET DE LEVIER MOYEN"
                      ) {
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
                            color={
                              cell?.row?.original?.avgPrice ||
                              cell?.row?.original?.closedPnl
                                ? cell?.row?.original?.avgPrice?.includes(
                                    "-"
                                  ) ||
                                  cell?.row?.original?.closedPnl?.includes("-")
                                  ? "red"
                                  : "green.300"
                                : cell?.row?.original?.roe
                                    ?.toString()
                                    ?.includes("-")
                                ? "red"
                                : "green.300"
                            }
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell?.row?.original?.avgPrice ||
                            cell?.row?.original?.closedPnl
                              ? cell?.row?.original?.avgPrice?.includes("-") ||
                                cell?.row?.original?.closedPnl?.includes("-")
                                ? "Loss"
                                : "Profit"
                              : cell?.row?.original?.roe
                                  ?.toString()
                                  .includes("-")
                              ? "Loss"
                              : "Profit"}
                          </Text>
                        );
                      } else if (cell.column.Header === "DATE DE SORTIE") {
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
                      } else if (cell.column.Header === "NOM DU TRADER") {
                        data = (
                          <Flex gap={3} alignItems={"center"}>
                            <Avatar
                              h={{ base: "48px", xl: "36px", "2xl": "48px" }}
                              w={{ base: "48px", xl: "36px", "2xl": "48px" }}
                              src={cell?.row?.original?.userPhotoUrl}
                            />
                            <Text
                              color={textColor}
                              fontSize="sm"
                              fontWeight="400"
                            >
                              {cell.value}
                            </Text>
                          </Flex>
                        );
                      } else if (cell.column.Header === "ACTION") {
                        data = (
                          <Button
                            fontSize={{
                              "2xl": "16px",
                              xl: "12px",
                              lg: "12px",
                              md: "12px",
                              sm: "10px",
                            }}
                            variant="brand"
                            fontWeight="600"
                            w={"auto"}
                            h="35px"
                            display="flex"
                            bg={"#0075FF"}
                            borderRadius="6px"
                            textAlign={"left"}
                            gap={2}
                            onClick={() =>
                              onCopy(cell?.row?.original?.encryptedUid)
                            }
                            disabled={!exchangeConnection}
                          >
                            <Image
                              src={copy}
                              w={{
                                "2xl": "20px",
                                xl: "16px",
                                lg: "16px",
                                md: "16px",
                                sm: "10px",
                              }}
                            />
                            {"Copier"}
                          </Button>
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

      {/* <Divider /> */}
      {page.length > pageSize ? (
        <Box py={5}>
          <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
            <Button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              borderRadius={10}
              px={0}
              _hover={{ bg: activeIconColor }}
            >
              <Icon as={MdOutlineArrowBackIos} color={iconColor} />
            </Button>
            {pageOptions?.map((item, index) => (
              <Button
                onClick={() => gotoPage(index)}
                px={0}
                borderRadius={10}
                color={index === pageIndex ? activeTextColor : iconColor}
                _hover={{
                  bg:
                    index === pageIndex
                      ? !activeTextColor
                      : "rgba(87, 148, 250, 0.08)",
                }}
                bg={
                  index === pageIndex
                    ? activebgColor
                    : "rgba(87, 148, 250, 0.08)"
                }
              >
                {++item}
              </Button>
            ))}
            <Button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              px={0}
              borderRadius={10}
              _hover={{ bg: activeIconColor }}
            >
              <Icon
                as={MdOutlineArrowForwardIos}
                // fontSize={20}
                color={iconColor}
              />
            </Button>
          </Flex>
        </Box>
      ) : null}
    </Box>
  );
}
