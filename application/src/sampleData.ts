export const sampleData = {
  partner_code: "TOGGLE",
  policy_number: "POL-123456",
  policy_starts_at: "2024-03-14",
  policy_ends_at: "2025-03-14",
  underwriter: {
    name: "Sample Insurance Co",
    address: "123 Insurance St, NY 10001",
    phone_number: "1-800-555-0123",
    email: "claims@sample.com",
  },
  policyholder: {
    name: "John Doe",
    address: "456 Main St, NY 10002",
    phone_number: "1-555-123-4567",
    email: "john@email.com",
  },
  spouse: {
    name: "Jane Doe",
  },
  policy_premium: "1,200.00",
  currency: "$",
  regulatory_charges: "50.00",
  policy_premium_and_fees: "1,250.00",
  monthly_charge: "104.17",
  drivers_groups: [
    { name: "John Doe", is_excluded: false },
    { name: "Jane Doe", is_excluded: false },
  ],
  vehicles_groups: [
    {
      year: "2020",
      make: "Toyota",
      model: "Camry",
      vin: "1HGCM82633A123456",
      garaging_location: { postal: "10002" },
    },
  ],
  effective_since: "2024-03-14",
  carrier: "Toggle",
};
