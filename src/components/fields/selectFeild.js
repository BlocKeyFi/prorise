// ProRIse imports
import {
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React from "react";
import present from "assets/img/dashboards/svgIcon/presentation-chart.svg";
import { selectTimeDuration } from "constants/constants";
import { RiArrowDownSFill } from "react-icons/ri";
import { selectValue } from "constants/constants";

export default function SelectFeild(props) {
  const { w, name, color, ...rest } = props;

  const timeLineFilter = selectValue(name);

  const textColorSecondary = useColorModeValue("gray.200", "gray.200");
  return (
    <Flex direction={"row"} w="100%" justifyContent={"start"}>
      <img src={present} width={15} />
      <Select
        className="my-select"
        {...rest}
        bg="transparent"
        border="none"
        color={color ? color : textColorSecondary}
        fontSize="sm"
        w={w}
        icon={<Icon as={RiArrowDownSFill} />}
        _focus={{ border: "none" }}
        textTransform={"capitalize"}
      >
        {timeLineFilter?.map((item) => (
          <option value={item.value}>{item.title}</option>
        ))}
      </Select>
    </Flex>
  );
}
