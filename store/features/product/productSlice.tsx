import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define rate for pricing tiers
export interface Rate {
  pricePerPax: string;
  maxPax: string;
  minPax: string;
}

// Define the package type
interface PackageTour {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  rate: Rate[];
  terms: string;
  available: boolean;
  destination: string;
  duration: string;
  includes: string[];
  excludes: string[];
  itinerary: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  packages: PackageTour[];
  filteredAndSortedPackages: PackageTour[];
  paginatedPackages: PackageTour[];
  searchQuery: string;
  minPrice: number | '';
  maxPrice: number | '';
  availabilityFilter: string;
  destinationFilter: string;
  sortOrder: string;
  currentPage: number;
  itemsPerPage: number;
  selectedPackage: PackageTour | null;
}

// Sample package data
const samplePackages: PackageTour[] = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/400/200?random=1",
    title: "Bali Holiday Package",
    description:
      "Experience the beauty of Bali with a 5-day tour including Ubud, beaches, and cultural sites.",
    rate: [
      { pricePerPax: "25000000", minPax: "1", maxPax: "3" },
      { pricePerPax: "22000000", minPax: "4", maxPax: "8" },
      { pricePerPax: "20000000", minPax: "9", maxPax: "15" }
    ],
    terms: "Non-refundable. Minimum 2 pax. Travel insurance not included.",
    available: true,
    destination: "Bali, Indonesia",
    duration: "5 Days 4 Nights",
    includes: ["Accommodation", "Daily Breakfast", "Transportation", "English Guide", "Entrance Fees"],
    excludes: ["Flight Tickets", "Travel Insurance", "Personal Expenses", "Lunch & Dinner", "Tips"],
    itinerary: [
      "Day 1: Arrival & Check-in, Ubud Village Tour",
      "Day 2: Temple Hopping (Tanah Lot, Uluwatu)",
      "Day 3: Tegallalang Rice Terrace & Art Villages",
      "Day 4: Beach Activities & Water Sports",
      "Day 5: Shopping & Departure"
    ],
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z"
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/400/200?random=2",
    title: "Japan Autumn Tour",
    description:
      "Explore Japan's autumn colors with visits to Tokyo, Kyoto, and Osaka.",
    rate: [
      { pricePerPax: "45000000", minPax: "1", maxPax: "2" },
      { pricePerPax: "42000000", minPax: "3", maxPax: "6" },
      { pricePerPax: "40000000", minPax: "7", maxPax: "12" }
    ],
    terms: "Cancellation policy applies. Flights not included.",
    available: false,
    destination: "Tokyo, Japan",
    duration: "7 Days 6 Nights",
    includes: ["Hotel Accommodation", "Daily Breakfast", "JR Pass", "English Guide", "Entrance Fees"],
    excludes: ["International Flights", "Travel Insurance", "Lunch & Dinner", "Personal Shopping", "Optional Activities"],
    itinerary: [
      "Day 1: Arrival in Tokyo, City Orientation",
      "Day 2: Tokyo Sightseeing (Senso-ji, Shibuya, Harajuku)",
      "Day 3: Day trip to Mt. Fuji",
      "Day 4: Travel to Kyoto, Temple Tour",
      "Day 5: Kyoto Cultural Experience",
      "Day 6: Osaka Castle & Dotonbori",
      "Day 7: Departure"
    ],
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-02-05T14:45:00Z"
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/400/200?random=3",
    title: "Paris Romantic Getaway",
    description: "Spend 3 nights in Paris, the city of love.",
    rate: [
      { pricePerPax: "35000000", minPax: "2", maxPax: "2" },
      { pricePerPax: "32000000", minPax: "4", maxPax: "6" }
    ],
    terms: "Non-refundable. Passport required.",
    available: true,
    destination: "Paris, France",
    duration: "4 Days 3 Nights",
    includes: ["Boutique Hotel", "Daily Breakfast", "Seine River Cruise", "English Guide", "Museum Passes"],
    excludes: ["Flight Tickets", "Travel Insurance", "Lunch & Dinner", "Personal Expenses", "Optional Tours"],
    itinerary: [
      "Day 1: Arrival, Eiffel Tower & Champs-Élysées",
      "Day 2: Louvre Museum & Notre-Dame Cathedral",
      "Day 3: Versailles Palace Day Trip",
      "Day 4: Montmartre & Sacré-Cœur, Departure"
    ],
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-01-25T16:20:00Z"
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/400/200?random=4",
    title: "Thailand Adventure",
    description: "Discover the wonders of Thailand with beach and mountain tours.",
    rate: [
      { pricePerPax: "18000000", minPax: "1", maxPax: "4" },
      { pricePerPax: "16000000", minPax: "5", maxPax: "10" },
      { pricePerPax: "15000000", minPax: "11", maxPax: "20" }
    ],
    terms: "Refundable within 24 hours. Group discounts available.",
    available: true,
    destination: "Bangkok, Thailand",
    duration: "6 Days 5 Nights",
    includes: ["Hotel Accommodation", "Daily Breakfast", "Transportation", "English Guide", "Boat Tours"],
    excludes: ["Flight Tickets", "Travel Insurance", "Lunch & Dinner", "Personal Expenses", "Spa Treatments"],
    itinerary: [
      "Day 1: Arrival in Bangkok, Grand Palace Tour",
      "Day 2: Floating Market & Temple Tour",
      "Day 3: Travel to Phuket, Beach Activities",
      "Day 4: Island Hopping Tour",
      "Day 5: Phi Phi Islands Excursion",
      "Day 6: Return to Bangkok, Departure"
    ],
    createdAt: "2024-01-10T07:30:00Z",
    updatedAt: "2024-01-15T12:45:00Z"
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/400/200?random=5",
    title: "Switzerland Alps Trek",
    description: "Experience the majestic Swiss Alps with guided trekking tours.",
    rate: [
      { pricePerPax: "55000000", minPax: "1", maxPax: "2" },
      { pricePerPax: "50000000", minPax: "3", maxPax: "6" },
      { pricePerPax: "48000000", minPax: "7", maxPax: "12" }
    ],
    terms: "Weather dependent. Professional guide included.",
    available: true,
    destination: "Zurich, Switzerland",
    duration: "8 Days 7 Nights",
    includes: ["Mountain Lodge", "All Meals", "Professional Guide", "Trekking Equipment", "Transportation"],
    excludes: ["Flight Tickets", "Travel Insurance", "Personal Gear", "Tips", "Optional Activities"],
    itinerary: [
      "Day 1: Arrival in Zurich, Equipment Check",
      "Day 2: Travel to Grindelwald, Easy Trek",
      "Day 3: Jungfraujoch - Top of Europe",
      "Day 4: Lauterbrunnen Valley Trek",
      "Day 5: Interlaken Adventure Sports",
      "Day 6: Zermatt & Matterhorn View",
      "Day 7: Lake Geneva Region",
      "Day 8: Return to Zurich, Departure"
    ],
    createdAt: "2024-01-05T06:45:00Z",
    updatedAt: "2024-01-12T14:30:00Z"
  },
  {
    id: 6,
    imageUrl: "https://picsum.photos/400/200?random=6",
    title: "Dubai Desert Safari",
    description: "Experience the magic of Dubai's desert with camel rides and traditional dinner.",
    rate: [
      { pricePerPax: "12000000", minPax: "1", maxPax: "5" },
      { pricePerPax: "10000000", minPax: "6", maxPax: "15" },
      { pricePerPax: "9000000", minPax: "16", maxPax: "25" }
    ],
    terms: "All-inclusive package. Vegetarian options available.",
    available: false,
    destination: "Dubai, UAE",
    duration: "3 Days 2 Nights",
    includes: ["Luxury Hotel", "Daily Breakfast", "Desert Safari", "Camel Ride", "Traditional Dinner"],
    excludes: ["Flight Tickets", "Travel Insurance", "Lunch", "Personal Shopping", "Optional Tours"],
    itinerary: [
      "Day 1: Arrival, Dubai City Tour, Burj Khalifa",
      "Day 2: Desert Safari, Camel Ride, BBQ Dinner",
      "Day 3: Dubai Mall, Gold Souk, Departure"
    ],
    createdAt: "2024-02-10T08:15:00Z",
    updatedAt: "2024-02-15T13:00:00Z"
  }
];

const initialState: ProductState = {
  packages: samplePackages,
  filteredAndSortedPackages: samplePackages,
  paginatedPackages: samplePackages.slice(0, 6),
  searchQuery: '',
  minPrice: '',
  maxPrice: '',
  availabilityFilter: 'all',
  destinationFilter: '',
  sortOrder: 'price-asc',
  currentPage: 1,
  itemsPerPage: 6,
  selectedPackage: null,
};

// Helper functions for state updates
const getLowestPrice = (rates: Rate[]) => {
  if (!rates || rates.length === 0) return 0;
  return Math.min(...rates.map(r => parseInt(r.pricePerPax)));
};

const updateFilteredAndSortedPackages = (state: ProductState) => {
  let filteredPackages = state.packages;

  // Search filter
  if (state.searchQuery) {
    filteredPackages = filteredPackages.filter(pkg =>
      pkg.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  // Price range filter
  if (state.minPrice !== '') {
    filteredPackages = filteredPackages.filter(pkg => getLowestPrice(pkg.rate) >= Number(state.minPrice));
  }
  if (state.maxPrice !== '') {
    filteredPackages = filteredPackages.filter(pkg => getLowestPrice(pkg.rate) <= Number(state.maxPrice));
  }

  // Availability filter
  if (state.availabilityFilter !== 'all') {
    filteredPackages = filteredPackages.filter(pkg => 
      state.availabilityFilter === 'available' ? pkg.available : !pkg.available
    );
  }

  // Destination filter
  if (state.destinationFilter) {
    filteredPackages = filteredPackages.filter(pkg =>
      pkg.destination.toLowerCase().includes(state.destinationFilter.toLowerCase())
    );
  }

  // Sort packages
  const [sortBy, order] = state.sortOrder.split('-');
  state.filteredAndSortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'price') {
      const priceA = getLowestPrice(a.rate);
      const priceB = getLowestPrice(b.rate);
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    }
    if (sortBy === 'title') {
      return order === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });
};

const updatePaginatedPackages = (state: ProductState) => {
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  state.paginatedPackages = state.filteredAndSortedPackages.slice(
    startIndex,
    startIndex + state.itemsPerPage
  );
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      updateFilteredAndSortedPackages(state);
      updatePaginatedPackages(state);
    },
    
    setMinPrice: (state, action: PayloadAction<number | ''>) => {
      state.minPrice = action.payload;
      state.currentPage = 1;
      updateFilteredAndSortedPackages(state);
      updatePaginatedPackages(state);
    },
    
    setMaxPrice: (state, action: PayloadAction<number | ''>) => {
      state.maxPrice = action.payload;
      state.currentPage = 1;
      updateFilteredAndSortedPackages(state);
      updatePaginatedPackages(state);
    },
    
    setAvailabilityFilter: (state, action: PayloadAction<string>) => {
      state.availabilityFilter = action.payload;
      state.currentPage = 1;
      updateFilteredAndSortedPackages(state);
      updatePaginatedPackages(state);
    },
    
    setDestinationFilter: (state, action: PayloadAction<string>) => {
      state.destinationFilter = action.payload;
      state.currentPage = 1;
      updateFilteredAndSortedPackages(state);
      updatePaginatedPackages(state);
    },
    
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
      updateFilteredAndSortedPackages(state);
      updatePaginatedPackages(state);
    },
    
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      updatePaginatedPackages(state);
    },
    
    setSelectedPackage: (state, action: PayloadAction<PackageTour | null>) => {
      state.selectedPackage = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setMinPrice,
  setMaxPrice,
  setAvailabilityFilter,
  setDestinationFilter,
  setSortOrder,
  setCurrentPage,
  setSelectedPackage,
} = productSlice.actions;

// Export helper function for components to use
export { getLowestPrice };

export default productSlice.reducer;