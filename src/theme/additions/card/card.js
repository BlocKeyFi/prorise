import { mode } from "@chakra-ui/theme-tools";
const Card = {
  baseStyle: (props) => ({
    p: "20px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    borderRadius: "16px",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: mode(
      "linear-gradient(175deg, rgba(6, 11, 40, 0.67) 0%, rgba(10, 14, 35, 0.64) 100%);",
      "linear-gradient(175deg, rgba(6, 11, 40, 0.67) 0%, rgba(10, 14, 35, 0.64) 100%);"
    )(props),
    backgroundClip: "border-box",
  }),
};

export const CardComponent = {
  components: {
    Card,
  },
};
