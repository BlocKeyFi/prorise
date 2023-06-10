// ProRIse imports
import {
  Flex,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import copyIcon from "../../assets/img/dashboards/svgIcon/copy.svg";

export default function Default(props) {
  const { id, label, extra, placeholder, type, mb, onChange, copy, ...rest } =
    props;
  // ProRIse Color Mode
  const textColorPrimary = useColorModeValue("white", "white");
  const textColorSecondary = "gray.400";

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex direction="column" mb={mb ? mb : "30px"}>
      <FormLabel
        display="flex"
        ms="10px"
        htmlFor={id}
        fontSize="lg"
        color={textColorPrimary}
        _hover={{ cursor: "pointer" }}
      >
        {label}
        <Text fontSize="sm" fontWeight="400" ms="2px">
          {extra}
        </Text>
      </FormLabel>
      <InputGroup size="md">
        {copy === "copy" && (
          <InputLeftElement display="flex" alignItems="center" mt="8px">
            <img
              color={textColorSecondary}
              _hover={{ cursor: "pointer" }}
              src={copyIcon}
            />
          </InputLeftElement>
        )}
        <Input
          {...rest}
          type={show && type}
          id={id}
          fontWeight="500"
          variant="main"
          color={textColorSecondary}
          placeholder={placeholder}
          _placeholder={{ fontWeight: "400", color: "white" }}
          h="53px"
          maxh="53px"
          bg="rgba(0, 0, 0, 0.2)"
          borderRadius="8"
          fontSize={"16px"}
          border="0.8px solid rgba(255, 255, 255, 0.3) !important"
          onChange={onChange}
        />
        {type === "password" && (
          <InputRightElement display="flex" alignItems="center" mt="4px">
            <Icon
              color={textColorSecondary}
              _hover={{ cursor: "pointer" }}
              as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
              onClick={handleClick}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Flex>
  );
}
