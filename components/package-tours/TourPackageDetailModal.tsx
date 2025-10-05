'use client';

import React from 'react';
import { TourPackage } from '@/store/features/tour-package/tourPackageSlice';

interface TourPackageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourPackage: TourPackage | null;
}

const TourPackageDetailModal: React.FC<TourPackageDetailModalProps> = ({
  isOpen,
  onClose,
  tourPackage,
}) => {
  if (!isOpen || !tourPackage) return null;

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseInt(price));
  };

  // Get the lowest price from all rate tiers
  const getLowestPrice = () => {
    if (!tourPackage.rate || tourPackage.rate.length === 0) return 0;
    return Math.min(...tourPackage.rate.map(r => parseInt(r.pricePerPax)));
  };

  // Get the overall group size range
  const getGroupSizeRange = () => {
    if (!tourPackage.rate || tourPackage.rate.length === 0) return "1-10";
    const minPax = Math.min(...tourPackage.rate.map(r => parseInt(r.minPax)));
    const maxPax = Math.max(...tourPackage.rate.map(r => parseInt(r.maxPax)));
    return `${minPax}-${maxPax}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{tourPackage.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div>
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
                <img
                  src={tourPackage.imageUrl}
                  alt={tourPackage.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://picsum.photos/600/400?random=" + tourPackage.id;
                  }}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Package Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Destination:</span>&nbsp;{tourPackage.destination}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Duration:</span>&nbsp;{tourPackage.duration}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium">Group Size:</span>&nbsp;{getGroupSizeRange()} Pax
                    </div>
                  </div>
                </div>

                {/* Pricing Tiers */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing Tiers</h3>
                  <div className="space-y-2">
                    {tourPackage.rate.map((rate, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">
                          {rate.minPax}-{rate.maxPax} Passengers
                        </div>
                        <div className="text-sm font-medium text-blue-600">
                          {formatPrice(rate.pricePerPax)} per person
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tourPackage.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Itinerary and Includes/Excludes */}
            <div className="space-y-6">
              {/* Itinerary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Itinerary</h3>
                <div className="space-y-4">
                  {tourPackage.itinerary.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Day {index + 1}</h4>
                        <p className="text-gray-600 text-sm mt-1">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Included</h3>
                <ul className="space-y-2">
                  {tourPackage.includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excludes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Not Included</h3>
                <ul className="space-y-2">
                  {tourPackage.excludes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total price starting from</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatPrice(getLowestPrice().toString())}
              </p>
              <p className="text-sm text-gray-500">per person</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPackageDetailModal;