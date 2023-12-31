import { mode } from "@chakra-ui/theme-tools";
import background from "assets/img/Background.png";
export const globalStyles = {
  colors: {
    brand: {
      100: "#E9E3FF",
      200: "#422AFB",
      300: "#422AFB",
      400: "#7551FF",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#11047A",
    },
    brandScheme: {
      100: "#E9E3FF",
      200: "#7551FF",
      300: "#7551FF",
      400: "#7551FF",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A",
    },
    brandTabs: {
      100: "#E9E3FF",
      200: "#422AFB",
      300: "#422AFB",
      400: "#422AFB",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A",
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
      300: "#5CFF9C",
    },
    navy: {
      50: "#d0dcfb",
      100: "#aac0fe",
      200: "#a3b9f8",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      700: "#1B254B",
      800: "#111c44",
      900: "#0b1437",
    },
    gray: {
      100: "#FAFCFE",
      200: "#A0AEC0",
    },
    purpul: {
      100: "rgba(255, 255, 255, 0.08)",
      200: "rgba(0, 0, 0, 0.4)",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        // bg: mode(
        //   "radial-gradient(circle at 55% 100%, rgba(17, 74, 172, 1) 50%, rgba(39, 34, 115, 1) 43%, rgba(18, 18, 47, 1) 100%)",
        //   "radial-gradient(circle at 55% 100%, rgba(17, 74, 172, 1) 50%, rgba(39, 34, 115, 1) 43%, rgba(18, 18, 47, 1) 100%)"
        // )(props),

        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        fontFamily: "Urbanist",
        letterSpacing: "-0.5px",
      },

      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "Urbanist",
      },
      p: {
        letterSpacing: "0.5px",
      },
      table: {
        fontFamily: "Urbanist",
      },
    }),
  },
};
