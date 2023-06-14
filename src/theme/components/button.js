import { mode } from "@chakra-ui/theme-tools";
export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: "16px",
        boxShadow: "45px 76px 113px 7px rgba(112, 144, 176, 0.08)",
        transition: ".25s all ease",
        boxSizing: "border-box",
        _focus: {
          boxShadow: "none",
        },
        _active: {
          boxShadow: "none",
        },
      },
      variants: {
        outline: () => ({
          borderRadius: "16px",
        }),
        brand: (props) => ({
          bg: mode("#0075FF", "#0075FF")(props),
          color: "white",
          _focus: {
            bg: mode("#0075FF", "#0075FF")(props),
          },
          _active: {
            bg: mode("#0075FF", "#0075FF")(props),
          },
          _hover: {
            bg: mode("brand.600", "#0075FF")(props),
          },
        }),
        darkBrand: (props) => ({
          bg: mode("brand.900", "#0075FF")(props),
          color: "white",
          _focus: {
            bg: mode("brand.900", "#0075FF")(props),
          },
          _active: {
            bg: mode("brand.900", "#0075FF")(props),
          },
          _hover: {
            bg: mode("brand.800", "#0075FF")(props),
          },
        }),
        lightBrand: (props) => ({
          bg: mode("#F2EFFF", "whiteAlpha.100")(props),
          color: mode("#0075FF", "white")(props),
          _focus: {
            bg: mode("#F2EFFF", "whiteAlpha.100")(props),
          },
          _active: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _hover: {
            bg: mode("secondaryGray.400", "whiteAlpha.200")(props),
          },
        }),
        light: (props) => ({
          bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _active: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _hover: {
            bg: mode("secondaryGray.400", "whiteAlpha.200")(props),
          },
        }),
        action: (props) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("secondaryGray.300", "#0075FF")(props),
          color: mode("#0075FF", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "#0075FF")(props),
          },
          _active: { bg: mode("secondaryGray.300", "#0075FF")(props) },
          _hover: {
            bg: mode("secondaryGray.200", "#0075FF")(props),
          },
        }),
        setup: (props) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("transparent", "#0075FF")(props),
          border: mode("1px solid", "0px solid")(props),
          borderColor: mode("secondaryGray.400", "transparent")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("transparent", "#0075FF")(props),
          },
          _active: { bg: mode("transparent", "#0075FF")(props) },
          _hover: {
            bg: mode("secondaryGray.100", "#0075FF")(props),
          },
        }),
      },
    },
  },
};
