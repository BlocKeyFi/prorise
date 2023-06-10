import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./additions/card/card";
import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { inputStyles } from "./components/input";
import { textareaStyles } from "./components/textarea";
import { linkStyles } from "./components/link";
import { breakpoints } from "./foundations/breakpoints";
import { globalStyles } from "./styles";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
export default extendTheme(
  { breakpoints, config }, // Breakpoints
  globalStyles,
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  CardComponent // card component
);
