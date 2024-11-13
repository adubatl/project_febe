import React from "react";
import { Document, Page, Text, View, DocumentProps } from "@react-pdf/renderer";
import { CarrierTheme, getTheme, createPdfStyles } from "./styles.js";

interface PdfDocumentProps extends DocumentProps {
  partner_code: string;
  policy_number: string;
  policy_starts_at: string;
  policy_ends_at: string;
  underwriter: {
    name: string;
    address: string;
    phone_number: string;
    email: string;
  };
  policyholder: {
    name: string;
    address: string;
    phone_number: string;
    email: string;
  };
  spouse?: {
    name: string;
  };
  policy_premium: string;
  currency: string;
  regulatory_charges: string;
  policy_premium_and_fees: string;
  monthly_charge: string;
  drivers_groups: { name: string; is_excluded: boolean }[];
  vehicles_groups: {
    year: string;
    make: string;
    model: string;
    vin: string;
    garaging_location: { postal: string };
  }[];
  effective_since: string;
  carrier?: CarrierTheme;
}

export const PdfDocument: React.FC<PdfDocumentProps> = ({
  partner_code,
  policy_number,
  policy_starts_at,
  policy_ends_at,
  underwriter,
  policyholder,
  spouse = undefined,
  policy_premium,
  currency,
  regulatory_charges,
  policy_premium_and_fees,
  monthly_charge,
  drivers_groups,
  vehicles_groups,
  effective_since,
  carrier = "Toggle",
}) => {
  const theme = getTheme(carrier);
  const documentStyles = createPdfStyles(theme);

  return (
    <Document>
      <Page size="A4" style={documentStyles.page}>
        <Text style={documentStyles.title}>
          Auto Insurance Declarations Page
        </Text>

        <View style={documentStyles.section}>
          <View style={documentStyles.column}>
            <Text style={documentStyles.label}>Policy Number</Text>
            <Text>{policy_number}</Text>

            <Text style={documentStyles.label}>Policy Period</Text>
            <Text>From {policy_starts_at}</Text>
            <Text>To {policy_ends_at} 12:01AM</Text>

            <Text style={documentStyles.label}>Underwritten By</Text>
            <Text>{underwriter.name}</Text>
            <Text>{underwriter.address}</Text>
          </View>

          <View style={documentStyles.column}>
            <Text style={documentStyles.label}>Named Insured(s)</Text>
            <Text>{policyholder.name}</Text>
            {spouse && <Text>{spouse.name}</Text>}
            <Text>{policyholder.phone_number}</Text>
            <Text>{policyholder.email}</Text>
            <Text>{policyholder.address}</Text>
          </View>

          <View style={documentStyles.column}>
            <View style={documentStyles.table}>
              <Text style={documentStyles.tableHeader}>Premiums / Fees</Text>
              <View style={documentStyles.tableRow}>
                <Text>Full Term Policy Premium</Text>
                <Text>
                  {currency}
                  {policy_premium}
                </Text>
              </View>
              <View style={documentStyles.tableRow}>
                <Text>Fees*</Text>
                <Text>
                  {currency}
                  {regulatory_charges}
                </Text>
              </View>
              <View style={documentStyles.tableRow}>
                <Text>Total</Text>
                <Text>
                  {currency}
                  {policy_premium_and_fees}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Drivers Section */}
        <View style={documentStyles.section}>
          <Text style={documentStyles.sectionTitle}>
            Household Driver and Resident Information
          </Text>
          <View style={documentStyles.table}>
            {drivers_groups.map((driver) => (
              <View key={driver.name} style={documentStyles.tableRow}>
                <Text>{driver.name}</Text>
                <Text>{driver.is_excluded ? "Excluded" : "Covered"}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Vehicles Section */}
        <View style={documentStyles.section}>
          <Text style={documentStyles.sectionTitle}>Vehicle Information</Text>
          <View style={documentStyles.table}>
            {vehicles_groups.map((vehicle, idx) => (
              <View key={idx} style={documentStyles.tableRow}>
                <Text>{idx}</Text>
                <Text>
                  {vehicle.year} {vehicle.make} {vehicle.model}
                  {vehicle.vin}
                </Text>
                <Text>{vehicle.garaging_location.postal}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={documentStyles.footer}>
          Information is effective {effective_since}
        </Text>
      </Page>
    </Document>
  );
};
