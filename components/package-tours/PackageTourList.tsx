"use client";

import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import PackageTourCard from "./PackageTourCard";
import ProductControls from "./ProductControls";
import { RootState } from '../../store/store';
import {
  setSearchQuery,
  setMinPrice,
  setMaxPrice,
  setAvailabilityFilter,
  setDestinationFilter,
  setSortOrder,
  setCurrentPage,
  setSelectedPackage,
} from '../../store/features/product/productSlice';
import Pagination from '../generals/Pagination';

export default function PackageTourList() {
  const dispatch = useDispatch();
  const {
    paginatedPackages,
    filteredAndSortedPackages,
    searchQuery,
    minPrice,
    maxPrice,
    availabilityFilter,
    destinationFilter,
    sortOrder,
    currentPage,
    itemsPerPage,
  } = useSelector((state: RootState) => state.product);

  const totalPages = Math.ceil(filteredAndSortedPackages.length / itemsPerPage);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
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

      {/* Package Cards */}
      {paginatedPackages.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedPackages.map((pkg) => (
              <PackageTourCard
                key={pkg.id}
                imageUrl={pkg.imageUrl}
                title={pkg.title}
                description={pkg.description}
                pricePerPax={pkg.pricePerPax}
                terms={pkg.terms}
                available={pkg.available}
                destination={pkg.destination}
                onClick={() => dispatch(setSelectedPackage(pkg))}
              />
            ))}
          </div>
          
          {/* Results Summary */}
          <div className="text-center mb-4 text-gray-600">
            Showing {paginatedPackages.length} of {filteredAndSortedPackages.length} packages
          </div>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No packages found.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
}
