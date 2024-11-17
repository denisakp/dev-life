import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        "dark-high": "#0c1518",
        dark: "#39393b",
        "dark-low": "#f1f1f1",
        blue: "#4831D4",
        green: "#15DB95",
        yellow: "#EED971FF",
        red: "#EE4E34",
        codeGray: "#f5f5f5",
      },
      fontFamily: {
        sans: ["IBM Plex Serif", ...defaultTheme.fontFamily.sans],
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.dark-high"),
            a: {
              color: theme("colors.dark-high"),
              textDecoration: "none",
            },
            "a:hover": {
              textDecoration: "none",
            },
            p: {
              color: theme("colors.dark-high"),
            },
            h1: {
              textDecoration: "none",
              color: theme("colors.dark-high"),
              fontSize: theme("fontSize.3xl"),
              marginBottom: theme("spacing.1"),
            },
            h2: {
              textDecoration: "none",
              color: theme("colors.dark-high"),
              fontSize: theme("fontSize.2xl"),
              marginBottom: theme("spacing.3"),
            },
            h3: {
              textDecoration: "none",
              color: theme("colors.dark-high"),
              fontSize: theme("fontSize.xl"),
              marginBottom: theme("spacing.2"),
            },
            h4: {
              textDecoration: "none",
              color: theme("colors.dark-high"),
              fontSize: theme("fontSize.xl"),
              marginBottom: theme("spacing.1"),
            },
            blockquote: {
              quotes: "none",
              borderLeftColor: theme("colors.blue"),
              paddingLeft: theme("spacing.1"),
              fontStyle: "italic",
              color: theme("colors.dark"),
            },
            "blockquote p::before": { content: '""' },
            "blockquote p::after": { content: '""' },
            code: {
              color: theme("colors.dark"),
              backgroundColor: theme("colors.codeGray"),
              padding: theme("spacing.2"),
              borderRadius: theme("borderRadius.sm"),
            },
            "pre-code": {
              backgroundColor: theme("colors.codeGray"),
              padding: theme("spacing.4"),
              borderRadius: theme("borderRadius.md"),
            },
          },
        },
        lg: {
          css: {
            h1: { fontSize: theme("fontSize.5xl") },
            h2: { fontSize: theme("fontSize.4xl") },
            h3: { fontSize: theme("fontSize.3xl") },
          },
        },
      }),

    },
  },
  plugins: [require("@tailwindcss/typography")({className: "prose"})],
  darkMode: "class",
};
