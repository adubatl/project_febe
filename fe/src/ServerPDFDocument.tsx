import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { PDFContent } from "./types";

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "100vh",
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: "1px solid #333",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  metadata: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    lineHeight: 1.5,
    textAlign: "justify",
  },
});

interface ServerPDFDocumentProps {
  content: PDFContent;
  isClient?: boolean;
}

const PDFDocument: React.FC<ServerPDFDocumentProps> = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{content.title || "Untitled Document"}</Text>
        {content.author && (
          <Text style={styles.metadata}>Author: {content.author}</Text>
        )}
        {content.date && (
          <Text style={styles.metadata}>Date: {content.date}</Text>
        )}
      </View>
      <View>
        <Text style={styles.body}>{content.body || "No content provided"}</Text>
      </View>
    </Page>
  </Document>
);

const ServerPDFDocument: React.FC<ServerPDFDocumentProps> = ({
  content,
  isClient,
}) => {
  if (isClient) {
    return (
      <PDFViewer style={styles.viewer}>
        <PDFDocument content={content} />
      </PDFViewer>
    );
  }
  return <PDFDocument content={content} />;
};

export default ServerPDFDocument;
