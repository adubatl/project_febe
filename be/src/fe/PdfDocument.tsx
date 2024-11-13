import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  metadata: {
    fontSize: 12,
    marginBottom: 20,
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

interface PdfDocumentProps {
  title: string;
  author: string;
  date: string;
  body: string;
}

const PdfDocument: React.FC<PdfDocumentProps> = ({
  title,
  author,
  date,
  body,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.metadata}>
        <Text>Author: {author}</Text>
        <Text>Date: {date}</Text>
      </View>
      <Text style={styles.content}>{body}</Text>
    </Page>
  </Document>
);

export default PdfDocument;
