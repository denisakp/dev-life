import { defineTheme } from "pinceau";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

// @ts-ignore
export default defineTheme({
  // @ts-ignore
  transition: {
    all: "all .1s ease-in-out",
  },
  typography: {
    letterSpacings: {
      tight: "-0.035em",
      wide: "0.035em",
    },
    font: {
      display: "PaytoneOne",
      body: "{typography.font.sans}",
    },
  },
  // @ts-ignore
  color: {
    transparent: "transparent",
    current: "currentColor",
    black: colors.black,
    white: colors.white,
    darkHigh: "#0c1518",
    dark: "#39393b",
    darkLow: "#f1f1f1",
    blue: "#4831D4",
    green: "#15DB95",
    yellow: "#EED971FF",
    red: "#EE4E34",
  },
  fontSize: {
    ...defaultTheme.fontSize,
    "10xl": "9rem",
    "11xl": "11rem",
  },
  borderRadius: {
    "2xs": "2px",
    xs: "3px",
    sm: "5px",
    md: "6px",
    DEFAULT: "8px",
    lg: "10px",
    xl: "12px",
  },
  maxWidth: {
    "7xl": "72rem",
    "8xl": "80rem",
    "9xl": "90rem",
    "10xl": "100rem",
    "11xl": "110rem",
  },
});
