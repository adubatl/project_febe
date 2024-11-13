import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

const themes: Record<string, Theme> = {
  themeA: {
    primary: "rebeccapurple",
    secondary: "#90EE90", // light green
    background: "#ffffff",
    text: "#000000",
  },
  themeB: {
    primary: "#000080", // navy blue
    secondary: "#B0C4DE", // light steel blue
    background: "#ffffff",
    text: "#000000",
  },
};

interface PdfDocumentProps {
  title: string;
  author: string;
  date: string;
  body: string;
  clientTheme: keyof typeof themes;
}

const styles = (theme: Theme) =>
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
    },
    metadata: {
      fontSize: 12,
      marginBottom: 20,
      color: theme.secondary,
      padding: 10,
      borderLeft: `3px solid ${theme.primary}`,
    },
    content: {
      fontSize: 12,
      lineHeight: 1.5,
      color: theme.text,
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: "center",
      color: theme.secondary,
      borderTop: `2px solid ${theme.primary}`,
      paddingTop: 10,
    },
  });

export const PdfDocument: React.FC<PdfDocumentProps> = ({
  title,
  author,
  date,
  body,
  clientTheme,
}) => {
  const theme = themes[clientTheme];
  const documentStyles = styles(theme);

  return (
    <Document>
      <Page size="A4" style={documentStyles.page}>
        <Text style={documentStyles.title}>{title}</Text>
        <View style={documentStyles.metadata}>
          <Text>Author: {author}</Text>
          <Text>Date: {date}</Text>
        </View>
        <Text style={documentStyles.content}>{body}</Text>
        <Text style={documentStyles.footer}>
          Generated for {clientTheme} client
        </Text>
      </Page>
    </Document>
  );
};
