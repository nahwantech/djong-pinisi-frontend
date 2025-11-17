import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define booking interfaces
export interface BookingComponent {
  id: string;
  name: string;
  confirmed: boolean;
  confirmedAt?: string;
  confirmedBy?: string;
  notes?: string;
}

export interface Passenger {
  id: string;
  name: string;
  passportNo?: string;
  email?: string;
  dateOfBirth?: string;
  type: 'adult' | 'child' | 'infant';
}

export interface Booking {
  id: string;
  bookingCode: string;
  tourPackage: string;
  packageDetails: {
    duration: string;
    includes: string[];
    excludes: string[];
    itinerary: string[];
    termsAndConditions: string[];
  };
  picName: string;
  picEmail: string;
  picPhone: string;
  totalPax: number;
  passengers: Passenger[];
  tourPeriod: {
    startDate: string;
    endDate: string;
  };
  status: 'incoming' | 'on-progress' | 'closed';
  components: BookingComponent[];
  bookingDate: string;
  totalAmount: number;
  notes?: string;
}

interface BookingOperationsState {
  bookings: Booking[];
  filteredBookings: Booking[];
  selectedStatus: 'all' | 'incoming' | 'on-progress' | 'closed';
  selectedBooking: Booking | null;
  expandedPackageDetails: string | null;
  statusCounts: {
    all: number;
    incoming: number;
    'on-progress': number;
    closed: number;
  };
}

// Sample booking data
const sampleBookings: Booking[] = [
  {
    id: '1',
    bookingCode: 'DJP-2024-001',
    tourPackage: 'Bali Cultural Heritage Tour',
    packageDetails: {
      duration: '5 Days 4 Nights',
      includes: ['Accommodation (4-star hotel)', 'Daily Breakfast', 'Private Transportation', 'English Speaking Guide', 'Entrance Fees to Attractions', 'Airport Transfer'],
      excludes: ['International Flight Tickets', 'Travel Insurance', 'Lunch & Dinner', 'Personal Expenses', 'Tips for Driver & Guide', 'Visa Fees'],
      itinerary: [
        'Day 1: Arrival at Ngurah Rai Airport - Transfer to hotel - Ubud Village Tour - Traditional Market Visit',
        'Day 2: Temple Hopping Tour - Tanah Lot Temple (sunset) - Uluwatu Temple - Kecak Dance Performance',
        'Day 3: Tegallalang Rice Terrace - Art Villages (Mas, Celuk, Tohpati) - Monkey Forest Sanctuary',
        'Day 4: Beach Day - Sanur Beach - Water Sports Activities - Beach Club Lunch (own expense)',
        'Day 5: Last minute shopping - Joger Souvenir Shop - Transfer to airport for departure'
      ],
      termsAndConditions: [
        'Full payment required 14 days before departure date',
        'Cancellation 7-14 days before departure: 50% penalty applies',
        'Cancellation less than 7 days before departure: 100% penalty applies',
        'Travel insurance is highly recommended for international travelers',
        'Passport must be valid for at least 6 months from travel date',
        'Company is not responsible for delayed or cancelled flights',
        'Weather conditions may affect certain activities',
        'Vegetarian meal requests must be informed at least 3 days before departure',
        'Children under 2 years old are considered as infant (FOC)',
        'Additional charges apply for single room supplement'
      ]
    },
    picName: 'John Doe',
    picEmail: 'john@example.com',
    picPhone: '+62812345678',
    totalPax: 4,
    passengers: [
      { id: '1', name: 'John Doe', type: 'adult', passportNo: 'A1234567', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', type: 'adult', passportNo: 'A1234568', email: 'jane@example.com' },
      { id: '3', name: 'Jimmy Doe', type: 'child', passportNo: 'A1234569' },
      { id: '4', name: 'Jenny Doe', type: 'child', passportNo: 'A1234570' }
    ],
    tourPeriod: {
      startDate: '2024-12-15',
      endDate: '2024-12-19'
    },
    status: 'incoming',
    components: [
      { id: 'hotel', name: 'Hotel Accommodation', confirmed: false },
      { id: 'transport', name: 'Transportation', confirmed: false },
      { id: 'guide', name: 'Tour Guide', confirmed: false },
      { id: 'meals', name: 'Meals', confirmed: false }
    ],
    bookingDate: '2024-10-01',
    totalAmount: 100000000,
    notes: 'Customer requested vegetarian meals for 2 pax'
  },
  {
    id: '2',
    bookingCode: 'DJP-2024-002',
    tourPackage: 'Japan Autumn Tour',
    packageDetails: {
      duration: '7 Days 6 Nights',
      includes: ['Hotel Accommodation (4-star)', 'Daily Breakfast', 'JR Pass (7 days)', 'English Speaking Guide', 'Entrance Fees', 'Airport Transfer', 'Bullet Train Tickets'],
      excludes: ['International Flight Tickets', 'Travel Insurance', 'Lunch & Dinner', 'Personal Shopping', 'Optional Activities', 'Tips', 'Visa Processing'],
      itinerary: [
        'Day 1: Arrival in Tokyo Narita - City Orientation - Tokyo Station Area',
        'Day 2: Tokyo Sightseeing - Senso-ji Temple - Shibuya Crossing - Harajuku District - Tokyo Skytree',
        'Day 3: Day trip to Mt. Fuji - Lake Kawaguchi - Chureito Pagoda - Oshino Hakkai',
        'Day 4: Travel to Kyoto via Bullet Train - Fushimi Inari Shrine - Gion District',
        'Day 5: Kyoto Cultural Experience - Kiyomizu Temple - Bamboo Forest - Golden Pavilion',
        'Day 6: Osaka Castle - Dotonbori District - Kuromon Market - Nara Park (Optional)',
        'Day 7: Last minute shopping - Departure from Kansai Airport'
      ],
      termsAndConditions: [
        'Passport must be valid for minimum 6 months from departure date',
        'JR Pass activation required upon arrival',
        'Full payment required 21 days before departure',
        'Cancellation 14-21 days: 25% penalty applies',
        'Cancellation 7-14 days: 50% penalty applies',
        'Cancellation less than 7 days: 100% penalty applies',
        'Travel insurance mandatory for this package',
        'Weather may affect Mt. Fuji visibility',
        'Cherry blossom/autumn foliage viewing subject to seasonal conditions',
        'Halal meal arrangements available upon request (additional cost applies)'
      ]
    },
    picName: 'Alice Smith',
    picEmail: 'alice@example.com',
    picPhone: '+62812345679',
    totalPax: 2,
    passengers: [
      { id: '1', name: 'Alice Smith', type: 'adult', passportNo: 'B2345678', email: 'alice@example.com' },
      { id: '2', name: 'Bob Smith', type: 'adult', passportNo: 'B2345679', email: 'bob@example.com' }
    ],
    tourPeriod: {
      startDate: '2024-11-20',
      endDate: '2024-11-26'
    },
    status: 'on-progress',
    components: [
      { id: 'hotel', name: 'Hotel Accommodation', confirmed: true, confirmedAt: '2024-10-05', confirmedBy: 'Operations Team' },
      { id: 'transport', name: 'Transportation', confirmed: true, confirmedAt: '2024-10-05', confirmedBy: 'Operations Team' },
      { id: 'guide', name: 'Tour Guide', confirmed: false },
      { id: 'meals', name: 'Meals', confirmed: false }
    ],
    bookingDate: '2024-09-28',
    totalAmount: 90000000
  },
  {
    id: '3',
    bookingCode: 'DJP-2024-003',
    tourPackage: 'Thailand Adventure',
    packageDetails: {
      duration: '6 Days 5 Nights',
      includes: ['Hotel Accommodation (4-star beachfront)', 'Daily Breakfast', 'Private Transportation', 'English Speaking Guide', 'Boat Tours', 'Airport Transfer', 'Speed Boat to Islands'],
      excludes: ['International Flight Tickets', 'Travel Insurance', 'Lunch & Dinner', 'Personal Expenses', 'Spa Treatments', 'Alcoholic Beverages', 'Water Sports Equipment Rental'],
      itinerary: [
        'Day 1: Arrival in Bangkok - Grand Palace Tour - Wat Pho Temple - Chao Phraya River Cruise',
        'Day 2: Floating Market Tour - Maeklong Railway Market - Wat Arun Temple - Traditional Thai Massage',
        'Day 3: Fly to Phuket - Patong Beach - Beach Activities - Bangla Road Night Market',
        'Day 4: Island Hopping Tour - James Bond Island - Canoeing in Phang Nga Bay',
        'Day 5: Phi Phi Islands Excursion - Maya Beach - Snorkeling - Sunset Viewpoint',
        'Day 6: Last minute shopping - Central Phuket Mall - Return flight to Bangkok - International Departure'
      ],
      termsAndConditions: [
        'Valid passport required with minimum 6 months validity',
        'Visa on arrival fee (if applicable) not included',
        'Full payment required 10 days before departure',
        'Cancellation policy: 48 hours advance notice required',
        'No refund for no-show or late arrival',
        'Weather conditions may affect boat tours',
        'Life jacket mandatory during boat tours',
        'Swimming at own risk - company not liable for accidents',
        'Respect local customs and dress codes at temples',
        'Thai Baht currency recommended for local purchases'
      ]
    },
    picName: 'Mike Johnson',
    picEmail: 'mike@example.com',
    picPhone: '+62812345680',
    totalPax: 6,
    passengers: [
      { id: '1', name: 'Mike Johnson', type: 'adult' },
      { id: '2', name: 'Sarah Johnson', type: 'adult' },
      { id: '3', name: 'Tim Johnson', type: 'child' },
      { id: '4', name: 'Lisa Johnson', type: 'child' },
      { id: '5', name: 'Mark Wilson', type: 'adult' },
      { id: '6', name: 'Emma Wilson', type: 'adult' }
    ],
    tourPeriod: {
      startDate: '2024-10-10',
      endDate: '2024-10-15'
    },
    status: 'closed',
    components: [
      { id: 'hotel', name: 'Hotel Accommodation', confirmed: true, confirmedAt: '2024-09-15', confirmedBy: 'Operations Team' },
      { id: 'transport', name: 'Transportation', confirmed: true, confirmedAt: '2024-09-15', confirmedBy: 'Operations Team' },
      { id: 'guide', name: 'Tour Guide', confirmed: true, confirmedAt: '2024-09-16', confirmedBy: 'Operations Team' },
      { id: 'meals', name: 'Meals', confirmed: true, confirmedAt: '2024-09-16', confirmedBy: 'Operations Team' }
    ],
    bookingDate: '2024-09-01',
    totalAmount: 108000000,
    notes: 'Tour completed successfully. All components delivered as planned.'
  }
];

// Helper function to calculate status counts
const calculateStatusCounts = (bookings: Booking[]) => ({
  all: bookings.length,
  incoming: bookings.filter(b => b.status === 'incoming').length,
  'on-progress': bookings.filter(b => b.status === 'on-progress').length,
  closed: bookings.filter(b => b.status === 'closed').length,
});

// Helper function to filter bookings by status
const filterBookingsByStatus = (bookings: Booking[], status: 'all' | 'incoming' | 'on-progress' | 'closed') => {
  return status === 'all' ? bookings : bookings.filter(booking => booking.status === status);
};

const initialState: BookingOperationsState = {
  bookings: sampleBookings,
  filteredBookings: sampleBookings,
  selectedStatus: 'all',
  selectedBooking: null,
  expandedPackageDetails: null,
  statusCounts: calculateStatusCounts(sampleBookings),
};

const bookingOperationsSlice = createSlice({
  name: 'bookingOperations',
  initialState,
  reducers: {
    setSelectedStatus: (state, action: PayloadAction<'all' | 'incoming' | 'on-progress' | 'closed'>) => {
      state.selectedStatus = action.payload;
      state.filteredBookings = filterBookingsByStatus(state.bookings, action.payload);
    },

    setSelectedBooking: (state, action: PayloadAction<Booking | null>) => {
      state.selectedBooking = action.payload;
    },

    setExpandedPackageDetails: (state, action: PayloadAction<string | null>) => {
      state.expandedPackageDetails = action.payload;
    },

    confirmComponent: (state, action: PayloadAction<{ bookingId: string; componentId: string }>) => {
      const { bookingId, componentId } = action.payload;
      const booking = state.bookings.find(b => b.id === bookingId);
      
      if (booking) {
        const component = booking.components.find(c => c.id === componentId);
        if (component) {
          component.confirmed = true;
          component.confirmedAt = new Date().toISOString().split('T')[0];
          component.confirmedBy = 'Operations Team';

          // Check if all components are confirmed, then move to appropriate status
          const allConfirmed = booking.components.every(c => c.confirmed);
          
          if (booking.status === 'incoming') {
            booking.status = 'on-progress';
          } else if (allConfirmed && booking.status === 'on-progress') {
            booking.status = 'closed';
          }

          // Update filtered bookings and status counts
          state.filteredBookings = filterBookingsByStatus(state.bookings, state.selectedStatus);
          state.statusCounts = calculateStatusCounts(state.bookings);

          // Update selected booking if it's the one being modified
          if (state.selectedBooking && state.selectedBooking.id === bookingId) {
            state.selectedBooking = { ...booking };
          }
        }
      }
    },

    updateBookingStatus: (state, action: PayloadAction<{ bookingId: string; newStatus: 'incoming' | 'on-progress' | 'closed' }>) => {
      const { bookingId, newStatus } = action.payload;
      const booking = state.bookings.find(b => b.id === bookingId);
      
      if (booking) {
        booking.status = newStatus;
        
        // Update filtered bookings and status counts
        state.filteredBookings = filterBookingsByStatus(state.bookings, state.selectedStatus);
        state.statusCounts = calculateStatusCounts(state.bookings);

        // Update selected booking if it's the one being modified
        if (state.selectedBooking && state.selectedBooking.id === bookingId) {
          state.selectedBooking = { ...booking };
        }
      }
    },

    addBookingNote: (state, action: PayloadAction<{ bookingId: string; note: string }>) => {
      const { bookingId, note } = action.payload;
      const booking = state.bookings.find(b => b.id === bookingId);
      
      if (booking) {
        booking.notes = note;
        
        // Update selected booking if it's the one being modified
        if (state.selectedBooking && state.selectedBooking.id === bookingId) {
          state.selectedBooking = { ...booking };
        }
      }
    },

    addNewBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
      state.filteredBookings = filterBookingsByStatus(state.bookings, state.selectedStatus);
      state.statusCounts = calculateStatusCounts(state.bookings);
    },

    removeBooking: (state, action: PayloadAction<string>) => {
      const bookingId = action.payload;
      state.bookings = state.bookings.filter(b => b.id !== bookingId);
      state.filteredBookings = filterBookingsByStatus(state.bookings, state.selectedStatus);
      state.statusCounts = calculateStatusCounts(state.bookings);
      
      // Clear selected booking if it's the one being removed
      if (state.selectedBooking && state.selectedBooking.id === bookingId) {
        state.selectedBooking = null;
      }
    },
  },
});

export const {
  setSelectedStatus,
  setSelectedBooking,
  setExpandedPackageDetails,
  confirmComponent,
  updateBookingStatus,
  addBookingNote,
  addNewBooking,
  removeBooking,
} = bookingOperationsSlice.actions;

export default bookingOperationsSlice.reducer;