import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    pricePerPax: 25000000,
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
    pricePerPax: 1200000000,
    terms: "Cancellation policy applies. Flights not included.",
    available: false,
    destination: "Tokyo, Japan",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/400/200?random=3",
    title: "Paris Romantic Getaway",
    description: "Spend 3 nights in Paris, the city of love.",
    pricePerPax: 90000000,
    terms: "Non-refundable. Passport required.",
    available: true,
    destination: "Paris, France",
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/400/200?random=4",
    title: "Thailand Adventure",
    description: "Discover the wonders of Thailand with beach and mountain tours.",
    pricePerPax: 18000000,
    terms: "Refundable within 24 hours. Group discounts available.",
    available: true,
    destination: "Bangkok, Thailand",
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/400/200?random=5",
    title: "Switzerland Alps Trek",
    description: "Experience the majestic Swiss Alps with guided trekking tours.",
    pricePerPax: 1500900000,
    terms: "Weather dependent. Professional guide included.",
    available: true,
    destination: "Zurich, Switzerland",
  },
  {
    id: 6,
    imageUrl: "https://picsum.photos/400/200?random=6",
    title: "Dubai Desert Safari",
    description: "Experience the magic of Dubai's desert with camel rides and traditional dinner.",
    pricePerPax: 12000000,
    terms: "All-inclusive package. Vegetarian options available.",
    available: false,
    destination: "Dubai, UAE",
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
    filteredPackages = filteredPackages.filter(pkg => pkg.pricePerPax >= Number(state.minPrice));
  }
  if (state.maxPrice !== '') {
    filteredPackages = filteredPackages.filter(pkg => pkg.pricePerPax <= Number(state.maxPrice));
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
      return order === 'asc' ? a.pricePerPax - b.pricePerPax : b.pricePerPax - a.pricePerPax;
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

export default productSlice.reducer;