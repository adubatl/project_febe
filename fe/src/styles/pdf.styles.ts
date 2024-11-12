import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
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
