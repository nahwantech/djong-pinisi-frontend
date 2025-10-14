'use client';

import { useState } from 'react';

// Define booking interfaces
interface BookingComponent {
  id: string;
  name: string;
  confirmed: boolean;
  confirmedAt?: string;
  confirmedBy?: string;
  notes?: string;
}

interface Passenger {
  id: string;
  name: string;
  passportNo?: string;
  email?: string;
  dateOfBirth?: string;
  type: 'adult' | 'child' | 'infant';
}

interface Booking {
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

export default function BookingListPage() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'incoming' | 'on-progress' | 'closed'>('all');
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [expandedPackageDetails, setExpandedPackageDetails] = useState<string | null>(null);

  // Filter bookings by status
  const filteredBookings = bookings.filter(booking => 
    selectedStatus === 'all' || booking.status === selectedStatus
  );

  // Get status counts
  const statusCounts = {
    all: bookings.length,
    incoming: bookings.filter(b => b.status === 'incoming').length,
    'on-progress': bookings.filter(b => b.status === 'on-progress').length,
    closed: bookings.filter(b => b.status === 'closed').length,
  };

  // Handle component confirmation
  const handleConfirmComponent = (bookingId: string, componentId: string) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => {
        if (booking.id === bookingId) {
          const updatedComponents = booking.components.map(component => {
            if (component.id === componentId) {
              return {
                ...component,
                confirmed: true,
                confirmedAt: new Date().toISOString().split('T')[0],
                confirmedBy: 'Operations Team'
              };
            }
            return component;
          });

          // Check if all components are confirmed, then move to 'closed' status
          const allConfirmed = updatedComponents.every(c => c.confirmed);
          
          return {
            ...booking,
            components: updatedComponents,
            status: booking.status === 'incoming' ? 'on-progress' : 
                   (allConfirmed ? 'closed' : booking.status)
          };
        }
        return booking;
      })
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'incoming': return 'bg-yellow-100 text-yellow-800';
      case 'on-progress': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Operations Dashboard</h1>
          <p className="text-gray-600">Monitor and manage tour package bookings</p>
        </div>

        {/* Status Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            {(['all', 'incoming', 'on-progress', 'closed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-6 py-4 text-sm font-medium capitalize transition-colors ${
                  selectedStatus === status
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status === 'all' ? 'All Bookings' : status.replace('-', ' ')}
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {statusCounts[status]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              {/* Booking Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{booking.bookingCode}</h3>
                    <p className="text-sm text-gray-600">{booking.tourPackage}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                    {booking.status.replace('-', ' ')}
                  </span>
                </div>
                
                {/* PIC Information */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-16">PIC:</span>
                    <span className="text-gray-900">{booking.picName}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-16">Email:</span>
                    <span className="text-gray-600">{booking.picEmail}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-16">Phone:</span>
                    <span className="text-gray-600">{booking.picPhone}</span>
                  </div>
                </div>
              </div>

              {/* Tour Details */}
              <div className="p-6 border-b border-gray-100">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Total Pax</p>
                    <p className="text-lg font-semibold text-gray-900">{booking.totalPax}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Amount</p>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(booking.totalAmount)}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Tour Period</p>
                  <p className="text-sm text-gray-900">
                    {new Date(booking.tourPeriod.startDate).toLocaleDateString()} - {new Date(booking.tourPeriod.endDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Passenger List */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Passengers</p>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {booking.passengers.map((passenger, index) => (
                      <div key={passenger.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-900">{passenger.name}</span>
                        <span className="text-gray-500 capitalize text-xs">{passenger.type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Package Details Toggle */}
                <div className="mt-4">
                  <button
                    onClick={() => setExpandedPackageDetails(
                      expandedPackageDetails === booking.id ? null : booking.id
                    )}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <span>Package Details</span>
                    <svg 
                      className={`w-4 h-4 transform transition-transform ${
                        expandedPackageDetails === booking.id ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedPackageDetails === booking.id && (
                    <div className="mt-3 space-y-3 bg-gray-50 p-3 rounded-lg text-sm">
                      {/* Duration */}
                      <div>
                        <p className="font-medium text-gray-700">Duration</p>
                        <p className="text-gray-600">{booking.packageDetails.duration}</p>
                      </div>

                      {/* Package Includes */}
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Package Includes</p>
                        <div className="text-gray-600 space-y-1">
                          {booking.packageDetails.includes.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                          {booking.packageDetails.includes.length > 3 && (
                            <p className="text-gray-500 text-xs">
                              +{booking.packageDetails.includes.length - 3} more items...
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Package Excludes */}
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Package Excludes</p>
                        <div className="text-gray-600 space-y-1">
                          {booking.packageDetails.excludes.slice(0, 2).map((item, index) => (
                            <div key={index} className="flex items-start">
                              <span className="text-red-500 mr-2">✗</span>
                              <span>{item}</span>
                            </div>
                          ))}
                          {booking.packageDetails.excludes.length > 2 && (
                            <p className="text-gray-500 text-xs">
                              +{booking.packageDetails.excludes.length - 2} more items...
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Itinerary Preview */}
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Itinerary Preview</p>
                        <div className="text-gray-600 space-y-1">
                          {booking.packageDetails.itinerary.slice(0, 2).map((day, index) => (
                            <p key={index} className="text-xs">{day}</p>
                          ))}
                          {booking.packageDetails.itinerary.length > 2 && (
                            <p className="text-gray-500 text-xs">
                              +{booking.packageDetails.itinerary.length - 2} more days...
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Terms & Conditions Preview */}
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Terms & Conditions</p>
                        <div className="text-gray-600 space-y-1">
                          {booking.packageDetails.termsAndConditions.slice(0, 2).map((term, index) => (
                            <p key={index} className="text-xs">• {term}</p>
                          ))}
                          {booking.packageDetails.termsAndConditions.length > 2 && (
                            <p className="text-gray-500 text-xs">
                              +{booking.packageDetails.termsAndConditions.length - 2} more terms...
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Component Status */}
              <div className="p-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Booking Components</p>
                <div className="space-y-2">
                  {booking.components.map((component) => (
                    <div key={component.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{component.name}</span>
                      <div className="flex items-center space-x-2">
                        {component.confirmed ? (
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            ✓ Confirmed
                          </span>
                        ) : (
                          <button
                            onClick={() => handleConfirmComponent(booking.id, component.id)}
                            className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                            disabled={booking.status === 'closed'}
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {booking.notes && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs font-medium text-yellow-800 mb-1">Notes:</p>
                    <p className="text-xs text-yellow-700">{booking.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                  {booking.status !== 'closed' && (
                    <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                      Update Status
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">No bookings match the selected status filter.</p>
          </div>
        )}

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Booking Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Booking Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Booking Code</label>
                        <p className="text-sm text-gray-900">{selectedBooking.bookingCode}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tour Package</label>
                        <p className="text-sm text-gray-900">{selectedBooking.tourPackage}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Booking Date</label>
                        <p className="text-sm text-gray-900">{new Date(selectedBooking.bookingDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                        <p className="text-sm text-gray-900">{formatCurrency(selectedBooking.totalAmount)}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <p className="text-sm text-gray-900">{selectedBooking.packageDetails.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* PIC Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">PIC Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="text-sm text-gray-900">{selectedBooking.picName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-sm text-gray-900">{selectedBooking.picEmail}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-sm text-gray-900">{selectedBooking.picPhone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Details Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Package Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Package Includes */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Package Includes</h4>
                      <div className="space-y-2">
                        {selectedBooking.packageDetails.includes.map((item, index) => (
                          <div key={index} className="flex items-start text-sm">
                            <span className="text-green-500 mr-2 mt-0.5">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Package Excludes */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Package Excludes</h4>
                      <div className="space-y-2">
                        {selectedBooking.packageDetails.excludes.map((item, index) => (
                          <div key={index} className="flex items-start text-sm">
                            <span className="text-red-500 mr-2 mt-0.5">✗</span>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itinerary Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Tour Itinerary</h3>
                  <div className="space-y-3">
                    {selectedBooking.packageDetails.itinerary.map((day, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-800">{day}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms and Conditions Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      {selectedBooking.packageDetails.termsAndConditions.map((term, index) => (
                        <div key={index} className="flex items-start text-sm">
                          <span className="text-blue-500 mr-2 mt-0.5">•</span>
                          <span className="text-gray-700">{term}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Passenger Details */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Passenger Details</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Passport No</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedBooking.passengers.map((passenger) => (
                          <tr key={passenger.id} className="border-t border-gray-200">
                            <td className="px-4 py-2 text-sm text-gray-900">{passenger.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-600 capitalize">{passenger.type}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{passenger.passportNo || '-'}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{passenger.email || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Component Status */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Component Confirmation Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedBooking.components.map((component) => (
                      <div key={component.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">{component.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            component.confirmed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {component.confirmed ? 'Confirmed' : 'Pending'}
                          </span>
                        </div>
                        {component.confirmed && (
                          <div className="text-xs text-gray-600">
                            <p>Confirmed: {component.confirmedAt}</p>
                            <p>By: {component.confirmedBy}</p>
                          </div>
                        )}
                        {!component.confirmed && selectedBooking.status !== 'closed' && (
                          <button
                            onClick={() => {
                              handleConfirmComponent(selectedBooking.id, component.id);
                              // Update the selected booking to reflect changes
                              const updatedBooking = bookings.find(b => b.id === selectedBooking.id);
                              if (updatedBooking) setSelectedBooking(updatedBooking);
                            }}
                            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                          >
                            Confirm Now
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}