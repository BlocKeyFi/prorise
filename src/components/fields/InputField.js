// ProRIse imports
import { CheckIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine, RiVisaLine } from "react-icons/ri";

export default function Default(props) {
  const { id, label, extra, placeholder, type, mb, onChange, icon, ...rest } =
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
      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents="none" mt={2}>
            <Icon as={icon} w={8} height={8} />
          </InputLeftElement>
        )}
        <Input
          {...rest}
          type={type}
          id={id}
          fontWeight="500"
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
