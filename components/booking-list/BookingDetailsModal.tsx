'use client';

import { useDispatch } from 'react-redux';
import {
  confirmComponent,
  Booking
} from '@/store/features/booking-operations/bookingOperationsSlice';


interface BookingDetailsModalProps {
  booking: Booking;
  onClose: () => void;
}

export default function BookingDetailsModal({
  booking,
  onClose,
}: BookingDetailsModalProps) {
  const dispatch = useDispatch<any>();
  const selectedBooking = booking;
    
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle component confirmation
  const handleConfirmComponent = (bookingId: string, componentId: string) => {
    dispatch(confirmComponent({ bookingId, componentId }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
            <button
              onClick={() => onClose()}
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
                      onClick={() => handleConfirmComponent(selectedBooking.id, component.id)}
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
  );
}