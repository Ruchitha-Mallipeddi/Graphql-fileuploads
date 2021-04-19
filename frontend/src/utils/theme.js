import { createMuiTheme } from "@material-ui/core/styles";
const fontSize = 14;
const htmlFontSize = 16;
const coef = fontSize / 14;
function pxToRem(value) {
  return `${(value / htmlFontSize) * coef}rem`;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#38888b",
    },
    header: {
      main: "#000000",
    },
  },
  spacing: 4,
  typography: {
    fontFamily: "Roboto",
    h2: {
      fontSize: "48px",
      color: "#38888b",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    h3: {
      fontSize: "30px",
      color: "#666666",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    h6: {
      fontSize: "20px",
      color: "#252631",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    subtitle1: {
      fontSize: pxToRem(20),
      fontWeight: 500,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.5",
      letterSpacing: "normal",
    },
    subtitle2: {
      fontSize: pxToRem(20),
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.5",
      letterSpacing: "normal",
    },
    caption: {
      fontSize: "14px !important",
      color: "#949494",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    body1: {
      fontSize: "16px",
      color: "#778ca2",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: 1.5,
      letterSpacing: "normal",
    },
    button: {
      textTransform: "capitalize",
      fontSize: "14px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
  overrides: {
    MuiTab: {
      root: {
        "&$selected": {
          backgroundColor: "white",
          color: "black",
        },
        color: "#000000",
        "min-height": "29px",
        minWidth: 0,
        "@media (min-width: 0px)": {
          minWidth: 0,
        },
        padding: "6px 20px",
        marginTop: "16px",
        textTransform: "none",
        "font-size": "15px",
        "&:first-child": {
          marginLeft: "49px",
        },
        marginLeft: "4px",
        backgroundColor: "#5c5c5c",
      },
      textColorInherit: {
        opacity: 1,
      },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: `transparent`,
        height: "0px",
      },
    },
    MuiButtonBase: {
      root: {
        "max-height": "29px",
      },
    },
    MuiIconButton: {
      root: {
        color: "#778ca2",
        borderRadius: "0px !important",
      },
    },
    // MuiSvgIcon: {
    //     root: {
    //         width: "22px",
    //         height: "22px",
    //     },
    // },
    MuiAppBar: {
      root: {
        boxShadow: "0 0 0 0",
      },
      colorDefault: {
        backgroundColor: "#fff",
      },
    },
    MuiBadge: {
      colorPrimary: {
        backgroundColor: "#6dd230",
      },
      colorError: {
        backgroundColor: "#fe4d97",
      },
    },
    MuiButton: {
      contained: {
        boxShadow: "0 0 0 0",
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

export default theme;
