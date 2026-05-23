import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // azul principal
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#257e99",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});