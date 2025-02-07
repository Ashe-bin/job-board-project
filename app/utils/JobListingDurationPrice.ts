interface ListingPriceProps {
  days: number;
  price: number;
  description: string;
}

export const JobListingDurationPrice: ListingPriceProps[] = [
  { days: 7, price: 10, description: "standard listing" },
  { days: 15, price: 20, description: "Extended visibility" },
  { days: 30, price: 50, description: "Maximum Exposure" },
];
