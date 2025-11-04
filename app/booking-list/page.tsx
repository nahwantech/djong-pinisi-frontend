'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookingDetailsModal from '@/components/booking-list/BookingDetailsModal';
import BookingCard from '@/components/booking-list/BookingCard';
import { RootState } from '../../store/store';
import { 
  setSelectedStatus,
  setSelectedBooking,
  setExpandedPackageDetails,
  confirmComponent
} from '../../store/features/booking-list/bookingListOperationsSlice';

export default function BookingListPage() {
  const dispatch = useDispatch();
  const { 
    filteredBookings,
    selectedStatus,
    selectedBooking,
    expandedPackageDetails,
    statusCounts
  } = useSelector((state: RootState) => state.bookingOperations);

  // Handle component confirmation
  const handleConfirmComponent = (bookingId: string, componentId: string) => {
    dispatch(confirmComponent({ bookingId, componentId }));
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
                onClick={() => dispatch(setSelectedStatus(status))}
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
            <BookingCard 
              key={booking.id}
              booking={booking} 
              getStatusColor={getStatusColor}
              formatCurrency={formatCurrency}
              handleConfirmComponent={handleConfirmComponent}
              setSelectedBooking={(booking) => dispatch(setSelectedBooking(booking))}
              expandedPackageDetails={expandedPackageDetails}
              setExpandedPackageDetails={(id) => dispatch(setExpandedPackageDetails(id))}
            />
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
          <BookingDetailsModal
            key={selectedBooking.id}
            booking={selectedBooking}
            onClose={() => dispatch(setSelectedBooking(null))}
          />
        )}
      </div>
    </div>
  );
}