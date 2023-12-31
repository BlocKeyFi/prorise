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
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import copy from "../../assets/img/dashboards/svgIcon/copy-fill.svg";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";

export default function GlobalTable(props) {
  const { columnsData, tableData, p, isLoading, onCopy, leaderBoard } = props;

  const { exchangeConnection } = useSelector((state) => state?.exchange);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const history = useHistory();

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
  initialState.pageSize = leaderBoard ? 20 : 10;
  initialState.pageIndex = 0;

  const textColor = useColorModeValue("secondaryGray.900", "white");

  let iconColor = useColorModeValue("secondaryGray.900", "white");
  let activeTextColor = useColorModeValue("secondaryGray.900", "white");
  let activebgColor = useColorModeValue("secondaryGray.900", "#0c0d22");
  let activeIconColor = useColorModeValue("secondaryGray.900", "#0c0d22");

  const maxPageButtons = 5; // You can adjust this number

  const renderPageButtons = () => {
    const totalPages = pageOptions.length;

    // Calculate the start and end index for the displayed page buttons
    let start = Math.max(0, pageIndex - Math.floor(maxPageButtons / 2));
    let end = Math.min(totalPages, start + maxPageButtons);

    // If the start index is 0, adjust the end index to show a consistent number of buttons
    if (start === 0) {
      end = Math.min(maxPageButtons, totalPages);
    }

    const pageButtons = [];

    if (start > 0) {
      // Add a "First Page" button if not on the first page
      pageButtons.push(
        <Button
          key="first"
          onClick={() => gotoPage(0)}
          px={0}
          borderRadius={10}
        >
          1
        </Button>
      );

      // Add ellipsis (...) to indicate more pages before current pages
      pageButtons.push(
        <Button key="ellipsis1" disabled px={0} borderRadius={10}>
          ...
        </Button>
      );
    }

    for (let i = start; i < end; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => gotoPage(i)}
          px={0}
          borderRadius={10}
          color={i === pageIndex ? activeTextColor : iconColor}
          _hover={{
            bg: i === pageIndex ? !activeTextColor : "rgba(87, 148, 250, 0.08)",
          }}
          bg={i === pageIndex ? activebgColor : "rgba(87, 148, 250, 0.08)"}
        >
          {i + 1}
        </Button>
      );
    }

    if (end < totalPages) {
      // Add ellipsis (...) to indicate more pages after current pages
      pageButtons?.push(
        <Button key="ellipsis2" disabled px={0} borderRadius={10}>
          ...
        </Button>
      );

      // Add a "Last Page" button if not on the last page
      pageButtons.push(
        <Button
          key="last"
          onClick={() => gotoPage(totalPages - 1)}
          px={0}
          borderRadius={10}
        >
          {totalPages}
        </Button>
      );
    }

    return pageButtons;
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" thickness="4px" speed="0.65s" />
      </Center>
    );
  }

  return (
    <Box p={p ? p : 0}>
      {page?.length ? (
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
                      font-weight={400}
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
                      if (
                        cell.column.Header === "DATE D’ENTREE" ||
                        cell.column.Header === "DATE"
                      ) {
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
                            {parseFloat(cell.value).toFixed(2)}
                          </Text>
                        );
                      } else if (cell.column.Header === "PRIX DE SORTIE") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {parseFloat(cell.value).toFixed(2)}
                          </Text>
                        );
                      } else if (cell.column.Header === "ROI") {
                        data = (
                          <Text
                            color={
                              parseFloat(cell.value) <= 0 ? "red" : "green.300"
                            }
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell?.row?.original?.roi
                              ? cell?.row?.original?.roi
                              : parseFloat(cell.value * 100 ?? 0).toFixed(2) +
                                "%"}
                            {/* {(cell?.row?.original?.roi &&
                              cell?.row?.original?.roi) ||
                              (cell?.row?.original?.unrealisedPnl &&
                                `${
                                  Math.round(
                                    parseFloat(
                                      cell?.row?.original?.unrealisedPnl
                                    ) * 100
                                  ) / 100
                                } %`) ||
                              (cell?.row?.original?.closedPnl &&
                                `${
                                  Math.round(
                                    parseFloat(cell?.row?.original?.closedPnl) *
                                      100
                                  ) / 100
                                } %`) ||
                              (cell?.row?.original?.roe &&
                                parseFloat(cell?.row?.original?.roe).toFixed(
                                  2
                                ) + " %")} */}
                          </Text>
                        );
                      } else if (cell.column.Header === "LEVIER") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value + "X"}
                          </Text>
                        );
                      } else if (cell.column.Header === "UTILISATEUR") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {cell.value}
                          </Text>
                        );
                      } else if (cell.column.Header === "RECOMPENSE") {
                        data = (
                          <Text
                            color={"green.300"}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {" € " + cell.value + ".00"}
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
                      } else if (cell.column.Header === "WIN RATE") {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {parseFloat(cell.value ?? 0).toFixed(2) + "%"}
                          </Text>
                        );
                      } else if (
                        cell.column.Header === "EFFET DE LEVIER MOYEN"
                      ) {
                        let totalLeverage = 0;

                        cell?.value.forEach((obj) => {
                          totalLeverage += obj.leverage;
                        });

                        const value = cell?.value?.length
                          ? totalLeverage / cell?.value?.length
                          : 0;

                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {value?.toFixed(2)}
                          </Text>
                        );
                      } else if (
                        cell.column.Header === "PNL AMOUNT" ||
                        cell.column.Header === "PNL"
                      ) {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {"$ " + parseFloat(cell.value ?? 0).toFixed(2)}
                          </Text>
                        );
                      } else if (cell.column.Header === "STATUS") {
                        data = (
                          <Text
                            color={
                              (cell?.row?.original?.roe ||
                                cell?.row?.original?.avgPrice ||
                                cell?.row?.original?.closedPnl ||
                                cell?.row?.original?.unrealisedPnl) &&
                              (cell?.row?.original?.roe <= 0 ||
                                cell?.row?.original?.avgPrice <= 0 ||
                                cell?.row?.original?.closedPnl <= 0 ||
                                cell?.row?.original?.unrealisedPnl <= 0)
                                ? "red"
                                : "green.300"
                            }
                            fontSize="sm"
                            fontWeight="400"
                          >
                            {(cell?.row?.original?.roe ||
                              cell?.row?.original?.avgPrice ||
                              cell?.row?.original?.closedPnl ||
                              cell?.row?.original?.unrealisedPnl) &&
                            (cell?.row?.original?.roe <= 0 ||
                              cell?.row?.original?.avgPrice <= 0 ||
                              cell?.row?.original?.closedPnl <= 0 ||
                              cell?.row?.original?.unrealisedPnl <= 0)
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
                        data = cell?.row?.original?.isfollowed ? (
                          <Flex
                            display={"flex"}
                            gap={2}
                            alignItems={"center"}
                            px={4}
                          >
                            <Icon as={AiOutlineCheck} />
                            {"Copié"}
                          </Flex>
                        ) : (
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
                            bg={"#0075FF"}
                            borderRadius="6px"
                            gap={2}
                            onClick={(e) => {
                              // Prevent row click event from bubbling up to the parent
                              e.stopPropagation();

                              // Handle the click event for the button here
                              onCopy(cell?.row?.original?.encryptedUid);
                            }}
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
                      } else if (cell.column.Header === "VOIR LE TRADER") {
                        data = (
                          <Flex
                            // gap={2}
                            alignItems={"center"}
                            color={textColor}
                            cursor={"pointer"}
                            justifyContent={"space-between"}
                          >
                            {cell?.row?.original?.traderNickName
                              ? cell?.row?.original?.traderNickName
                              : "-"}
                            {cell?.value && (
                              <Icon
                                as={FiExternalLink}
                                fontSize={{
                                  "2xl": "20px",
                                  xl: "16px",
                                  lg: "16px",
                                  md: "16px",
                                  sm: "10px",
                                }}
                                onClick={() =>
                                  history.push(
                                    `/admin/trader-detail/${cell?.value}`
                                  )
                                }
                              />
                            )}
                            {/* <Button
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
                              bg={"#0075FF"}
                              borderRadius="6px"
                              gap={2}
                              disabled={!cell?.value}
                              onClick={() =>
                                history.push(
                                  `/admin/trader-detail/${cell?.value}`
                                )
                              }
                            >
                              <Icon
                                as={FiExternalLink}
                                fontSize={{
                                  "2xl": "20px",
                                  xl: "16px",
                                  lg: "16px",
                                  md: "16px",
                                  sm: "10px",
                                }}
                              />
                            </Button> */}
                          </Flex>
                        );
                      }
                      return (
                        <Td
                          {...cell.getCellProps()}
                          key={index}
                          fontSize={{ sm: "14px", xl: "16px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          borderColor="transparent"
                          cursor={leaderBoard && "pointer"}
                          onClick={() =>
                            leaderBoard &&
                            history.push(
                              `/admin/trader-detail/${cell?.row?.original?.encryptedUid}`
                            )
                          }
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
      {data.length > pageSize ? (
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
            {renderPageButtons()}

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
