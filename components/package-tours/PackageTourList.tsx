"use client";

import { useState } from "react";
import PackageTourCard from "./PackageTourCard";

// Define the package type
interface PackageTour {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  pricePerPax: number;
  terms: string;
  available: boolean;
  destination: string;
}

// Dummy data
const packages: PackageTour[] = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/400/200?random=1",
    title: "Bali Holiday Package",
    description:
      "Experience the beauty of Bali with a 5-day tour including Ubud, beaches, and cultural sites.",
    pricePerPax: 250,
    terms: "Non-refundable. Minimum 2 pax. Travel insurance not included.",
    available: true,
    destination: "Bali, Indonesia",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/400/200?random=2",
    title: "Japan Autumn Tour",
    description:
      "Explore Japan's autumn colors with visits to Tokyo, Kyoto, and Osaka.",
    pricePerPax: 1200,
    terms: "Cancellation policy applies. Flights not included.",
    available: false,
    destination: "Tokyo, Japan",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/400/200?random=3",
    title: "Paris Romantic Getaway",
    description: "Spend 3 nights in Paris, the city of love.",
    pricePerPax: 900,
    terms: "Non-refundable. Passport required.",
    available: true,
    destination: "Paris, France",
  },
];

export default function PackageTourList() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">(0);
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [availability, setAvailability] = useState<string>("all");
  const [destination, setDestination] = useState("");

  // Filter logic
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(search.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(search.toLowerCase());

    const matchesPrice =
      (minPrice === "" || pkg.pricePerPax >= minPrice) &&
      (maxPrice === "" || pkg.pricePerPax <= maxPrice);

    const matchesAvailability =
      availability === "all" ||
      (availability === "available" && pkg.available) ||
      (availability === "not-available" && !pkg.available);

    const matchesDestination =
      destination === "" ||
      pkg.destination.toLowerCase().includes(destination.toLowerCase());

    return (
      matchesSearch &&
      matchesPrice &&
      matchesAvailability &&
      matchesDestination
    );
  });

  return (
    <div className="p-6">
      {/* Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or destination"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Price Range */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Price"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : "")}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : "")}
          />
        </div>

        {/* Availability Filter */}
        <select
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="not-available">Not Available</option>
        </select>

        {/* Destination */}
        <input
          type="text"
          placeholder="Filter by destination"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {/* Package Cards */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageTourCard
              key={pkg.id}
              imageUrl={pkg.imageUrl}
              title={pkg.title}
              description={pkg.description}
              pricePerPax={pkg.pricePerPax}
              terms={pkg.terms}
              available={pkg.available}
              destination={pkg.destination}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No packages found.</p>
      )}
    </div>
  );
}
