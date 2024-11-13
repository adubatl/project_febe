import { StyleSheet } from "@react-pdf/renderer";

interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export type CarrierTheme = "Toggle" | "Toyota" | "Uber" | "StateFarm";

const carrierThemes: Record<CarrierTheme, Theme> = {
  Toggle: {
    primary: "rebeccapurple",
    secondary: "#90EE90",
    background: "#ffffff",
    text: "#000000",
  },
  Toyota: {
    primary: "#FF0000",
    secondary: "#000000",
    background: "#ffffff",
    text: "#000000",
  },
  Uber: {
    primary: "#000000",
    secondary: "#ffffff",
    background: "#ffffff",
    text: "#000000",
  },
  StateFarm: {
    primary: "#FF0000",
    secondary: "#ffffff",
    background: "#ffffff",
    text: "#000000",
  },
};

export const getTheme = (carrier?: CarrierTheme): Theme => {
  if (!carrier || !carrierThemes[carrier]) {
    return carrierThemes.Toggle;
  }
  return carrierThemes[carrier];
};

export const createPdfStyles = (theme: Theme) =>
  StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: theme.background,
      padding: 30,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: theme.primary,
      textAlign: "center",
    },
    section: {
      margin: "10 0",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    column: {
      width: "30%",
    },
    label: {
      fontSize: 10,
      color: theme.primary,
      fontWeight: "bold",
      marginBottom: 5,
      marginTop: 10,
    },
    table: {
      width: "100%",
      marginTop: 10,
      border: `1px solid ${theme.primary}`,
    },
    tableHeader: {
      backgroundColor: theme.primary,
      color: theme.background,
      padding: 5,
      fontSize: 12,
      fontWeight: "bold",
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: `1px solid ${theme.secondary}`,
      padding: 5,
      fontSize: 10,
      justifyContent: "space-between",
    },
    sectionTitle: {
      fontSize: 16,
      color: theme.primary,
      fontWeight: "bold",
      marginBottom: 10,
      marginTop: 20,
      width: "100%",
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: "center",
      color: theme.secondary,
      fontSize: 10,
      borderTop: `1px solid ${theme.primary}`,
      paddingTop: 10,
    },
  });
