interface ListingPriceProps {
  days: number;
  price: number;
  description: string;
}

export const JobListingDurationPrice: ListingPriceProps[] = [
  { days: 30, price: 99, description: "standard listing" },
  { days: 60, price: 179, description: "Extended visibility" },
  { days: 90, price: 249, description: "Maximum Exposure" },
];
