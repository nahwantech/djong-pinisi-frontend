import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the tour package type
export interface TourPackage {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  pricePerPax: number;
  terms: string;
  available: boolean;
  destination: string;
  duration: string;
  maxPax: number;
  minPax: number;
  includes: string[];
  excludes: string[];
  itinerary: string[];
  createdAt: string;
  updatedAt: string;
}

interface TourPackageState {
  packages: TourPackage[];
  filteredPackages: TourPackage[];
  searchQuery: string;
  filterStatus: 'all' | 'available' | 'unavailable';
  selectedPackage: TourPackage | null;
  isLoading: boolean;
  error: string | null;
  // Modal states
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  packageToDelete: number | null;
}

// Sample tour package data for admin
const sampleTourPackages: TourPackage[] = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/400/200?random=1",
    title: "Bali Cultural Heritage Tour",
    description: "Explore Bali's rich cultural heritage with visits to ancient temples, traditional villages, and cultural performances.",
    pricePerPax: 2500000,
    terms: "Non-refundable after 7 days before departure. Minimum 2 pax required.",
    available: true,
    destination: "Bali, Indonesia",
    duration: "5 Days 4 Nights",
    maxPax: 15,
    minPax: 2,
    includes: ["Accommodation", "Meals", "Transportation", "Tour Guide", "Entrance Fees"],
    excludes: ["Flight Tickets", "Travel Insurance", "Personal Expenses", "Tips"],
    itinerary: [
      "Day 1: Arrival & Ubud Village Tour",
      "Day 2: Temple Hopping (Tanah Lot, Uluwatu)",
      "Day 3: Tegallalang Rice Terrace & Art Villages",
      "Day 4: Traditional Cooking Class & Spa",
      "Day 5: Departure"
    ],
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z"
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/400/200?random=2",
    title: "Yogyakarta Historical Journey",
    description: "Discover the ancient kingdoms of Java through historical sites and royal palaces.",
    pricePerPax: 1800000,
    terms: "Flexible cancellation up to 3 days before departure.",
    available: true,
    destination: "Yogyakarta, Indonesia",
    duration: "3 Days 2 Nights",
    maxPax: 20,
    minPax: 4,
    includes: ["Hotel", "Breakfast", "Transportation", "English Guide"],
    excludes: ["Lunch & Dinner", "Flight", "Personal Shopping"],
    itinerary: [
      "Day 1: Borobudur Sunrise & Temple Complex",
      "Day 2: Sultan Palace & Taman Sari",
      "Day 3: Prambanan Temple & Departure"
    ],
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-02-05T14:45:00Z"
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/400/200?random=3",
    title: "Raja Ampat Diving Expedition",
    description: "Experience world-class diving in the marine biodiversity capital of the world.",
    pricePerPax: 8500000,
    terms: "Diving certification required. Medical clearance needed.",
    available: false,
    destination: "Raja Ampat, West Papua",
    duration: "7 Days 6 Nights",
    maxPax: 8,
    minPax: 4,
    includes: ["Liveaboard Accommodation", "All Meals", "Diving Equipment", "Dive Guide"],
    excludes: ["Flight to Sorong", "Diving Insurance", "Nitrox"],
    itinerary: [
      "Day 1: Arrival & Check-in",
      "Day 2-6: Diving at Various Sites",
      "Day 7: Departure"
    ],
    createdAt: "2024-01-10T07:30:00Z",
    updatedAt: "2024-03-01T11:20:00Z"
  }
];

const initialState: TourPackageState = {
  packages: sampleTourPackages,
  filteredPackages: sampleTourPackages,
  searchQuery: '',
  filterStatus: 'all',
  selectedPackage: null,
  isLoading: false,
  error: null,
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  packageToDelete: null,
};

// Helper function to filter packages
const filterPackages = (state: TourPackageState) => {
  let filtered = [...state.packages];

  // Apply search filter
  if (state.searchQuery) {
    filtered = filtered.filter(pkg =>
      pkg.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  // Apply status filter
  if (state.filterStatus === 'available') {
    filtered = filtered.filter(pkg => pkg.available);
  } else if (state.filterStatus === 'unavailable') {
    filtered = filtered.filter(pkg => !pkg.available);
  }

  state.filteredPackages = filtered;
};

const tourPackageSlice = createSlice({
  name: 'tourPackage',
  initialState,
  reducers: {
    // Search and Filter actions
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      filterPackages(state);
    },

    setFilterStatus: (state, action: PayloadAction<'all' | 'available' | 'unavailable'>) => {
      state.filterStatus = action.payload;
      filterPackages(state);
    },

    // CRUD actions
    createTourPackage: (state, action: PayloadAction<Omit<TourPackage, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newPackage: TourPackage = {
        ...action.payload,
        id: Date.now(), // Simple ID generation for demo
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.packages.push(newPackage);
      filterPackages(state);
    },

    updateTourPackage: (state, action: PayloadAction<TourPackage>) => {
      const index = state.packages.findIndex(pkg => pkg.id === action.payload.id);
      if (index !== -1) {
        state.packages[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
        filterPackages(state);
      }
    },

    deleteTourPackage: (state, action: PayloadAction<number>) => {
      state.packages = state.packages.filter(pkg => pkg.id !== action.payload);
      filterPackages(state);
    },

    togglePackageAvailability: (state, action: PayloadAction<number>) => {
      const package_ = state.packages.find(pkg => pkg.id === action.payload);
      if (package_) {
        package_.available = !package_.available;
        package_.updatedAt = new Date().toISOString();
        filterPackages(state);
      }
    },

    // Selection actions
    setSelectedPackage: (state, action: PayloadAction<TourPackage | null>) => {
      state.selectedPackage = action.payload;
    },

    // Modal actions
    openCreateModal: (state) => {
      state.isCreateModalOpen = true;
    },

    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
    },

    openEditModal: (state, action: PayloadAction<TourPackage>) => {
      state.selectedPackage = action.payload;
      state.isEditModalOpen = true;
    },

    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.selectedPackage = null;
    },

    openDeleteModal: (state, action: PayloadAction<number>) => {
      state.packageToDelete = action.payload;
      state.isDeleteModalOpen = true;
    },

    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.packageToDelete = null;
    },

    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setFilterStatus,
  createTourPackage,
  updateTourPackage,
  deleteTourPackage,
  togglePackageAvailability,
  setSelectedPackage,
  openCreateModal,
  closeCreateModal,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
  setLoading,
  setError,
} = tourPackageSlice.actions;

export default tourPackageSlice.reducer;