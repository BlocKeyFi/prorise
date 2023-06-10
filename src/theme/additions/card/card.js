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
      "linear-gradient(126deg, rgba(18, 18, 47, 1) 28.26%, rgba(10, 14, 35, 0.53) 91.2%)",
      "linear-gradient(126deg, rgba(18, 18, 47, 1) 28.26%, rgba(10, 14, 35, 0.53) 91.2%)"
    )(props),
    backgroundClip: "border-box",
  }),
};

export const CardComponent = {
  components: {
    Card,
  },
};
