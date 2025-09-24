'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PackageTourList from "../../components/package-tours/PackageTourList";
import { RootState } from '../../store/store';
import { 
  setSearchQuery,
  setMinPrice,
  setMaxPrice,
  setAvailabilityFilter,
  setDestinationFilter,
  setSortOrder,
  setSelectedPackage
 } from '../../store/features/product/productSlice';
import PackageDetailModal from '../../components/package-tours/PackageDetailModal';
import ProductControls from '@/components/package-tours/ProductControls';

export default function Product() {
  const dispatch = useDispatch();
  const { 
    selectedPackage,
    searchQuery,
    minPrice,
    maxPrice,
    availabilityFilter,
    destinationFilter,
    sortOrder,
  } = useSelector((state: RootState) => state.product);

  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Package Tours
        </h1>

        {/* Product Controls */}
        <ProductControls
            onSearch={(query) => dispatch(setSearchQuery(query))}
            onMinPriceChange={(price) => dispatch(setMinPrice(price))}
            onMaxPriceChange={(price) => dispatch(setMaxPrice(price))}
            onAvailabilityFilter={(filter) => dispatch(setAvailabilityFilter(filter))}
            onDestinationFilter={(destination) => dispatch(setDestinationFilter(destination))}
            onSort={(order) => dispatch(setSortOrder(order))}
            searchQuery={searchQuery}
            minPrice={minPrice}
            maxPrice={maxPrice}
            availabilityFilter={availabilityFilter}
            destinationFilter={destinationFilter}
            sortOrder={sortOrder}
          />

        {/* Package Tour List with Redux */}
        <PackageTourList />
        
        {/* Package Detail Modal */}
        {selectedPackage && (
          <PackageDetailModal 
            pkg={selectedPackage}
            onClose={() => dispatch(setSelectedPackage(null))}
          />
        )}
      </div>
    </main>
  );
}