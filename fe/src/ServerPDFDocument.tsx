import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { PDFContent } from "./types";
import { pdfStyles } from "./styles/pdf.styles";
interface PDFDocumentProps {
  content: PDFContent;
}

const ServerPDFDocument: React.FC<PDFDocumentProps> = ({ content }) => {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page} debug>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>
            {content.title || "Untitled Document"}
          </Text>
          {content.author && (
            <Text style={pdfStyles.metadata}>Author: {content.author}</Text>
          )}
          {content.date && (
            <Text style={pdfStyles.metadata}>Date: {content.date}</Text>
          )}
        </View>
        <View>
          <Text style={pdfStyles.body}>
            {content.body || "No content provided"}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ServerPDFDocument;
