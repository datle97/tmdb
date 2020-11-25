import { createMuiTheme } from "@material-ui/core";

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
    MuiContainer: {
      maxWidthLg: {
        paddingTop: defaultTheme.spacing(3),
        paddingBottom: defaultTheme.spacing(3),
      },
    },
    MuiToolbar: {
      root: {
        // width container
        maxWidth: 1280,
        width: "100%",
        margin: "auto",
      },
    },
    MuiCardMedia: {
      root: {
        borderRadius: 8,
      },
    },
    MuiCardActionArea: {
      root: {
        borderRadius: 8,
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        color: "inherit",

        // Typography body1
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif"',
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
    },
    MuiTabs: {
      root: {
        alignItems: "center",
      },
    },
    MuiTab: {
      root: {
        [defaultTheme.breakpoints.up("xs")]: {
          minHeight: "auto",
          minWidth: "auto",
        },
        padding: "4px 0px",
        marginRight: defaultTheme.spacing(2),
        color: "inherit",
        textTransform: "none",

        // Typography body1
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif"',
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
    },
    PrivateTabIndicator: {
      root: {
        height: 4,
      },
      vertical: {
        width: 4,
      },
    },
    // MuiTouchRipple: {
    //   root: {
    //     display: "none",
    //   },
    // },
  },
  typography: {
    h3: {
      fontWeight: "bold",
    },
    h4: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "bold",
    },
    subtitle1: {
      fontWeight: "bold",
    },
  },
  palette: {
    primary: {
      main: "#142851",
      contrastText: defaultTheme.palette.getContrastText("#142851"),
    },
    secondary: {
      main: "#063440",
      contrastText: defaultTheme.palette.getContrastText("#063440"),
    },
  },
});

export default theme;
