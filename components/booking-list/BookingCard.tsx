'use client';


export default function BookingCard({
    booking,
    getStatusColor,
    formatCurrency,
    handleConfirmComponent,
    setSelectedBooking,
    expandedPackageDetails,
    setExpandedPackageDetails,
}) {

    return(
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
    )
}