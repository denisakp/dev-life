import { defineTheme } from "pinceau";
import colors from "tailwindcss/colors";

export default defineTheme({
  color: {
    primary: colors.emerald,
    secondary: colors.gray,
  },
  typography: {
    color: {
      secondary: colors.gray,
    },
  },
  prose: {
    code: {
      block: {
        backgroundColor: {
          initial: colors.gray["50"],
          dark: colors.gray["900"],
        },
      },
      inline: {
        backgroundColor: {
          initial: colors.gray["100"],
          dark: colors.gray["900"],
        },
      },
    },
  },
});
