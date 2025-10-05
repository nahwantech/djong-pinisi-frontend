'use client';

import React from 'react';
import { TourPackage } from '@/store/features/tour-package/tourPackageSlice';

interface TourPackageCardProps {
  tourPackage: TourPackage;
  onSelect: () => void;
}

const TourPackageCard: React.FC<TourPackageCardProps> = ({ tourPackage, onSelect }) => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {/* Package Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={tourPackage.imageUrl}
          alt={tourPackage.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://picsum.photos/400/200?random=" + tourPackage.id;
          }}
        />
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Available
          </span>
        </div>
      </div>

      {/* Package Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tourPackage.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tourPackage.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {tourPackage.destination}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {tourPackage.duration}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getGroupSizeRange()} Pax
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Starting from</p>
              <p className="text-xl font-bold text-blue-600">
                {formatPrice(getLowestPrice().toString())}
              </p>
              <p className="text-xs text-gray-500">per person</p>
            </div>
            <button
              onClick={onSelect}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPackageCard;