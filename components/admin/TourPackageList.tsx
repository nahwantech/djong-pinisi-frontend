'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  setSearchQuery, 
  setFilterStatus, 
  openCreateModal,
  togglePackageAvailability,
  openEditModal,
  openDeleteModal
} from '@/store/features/tour-package/tourPackageSlice';
import { TourPackage } from '@/store/features/tour-package/tourPackageSlice';
import PrimaryButton from '../generals/btns/primary-button';

const TourPackageList: React.FC = () => {
  const dispatch = useDispatch();
  const { 
    filteredPackages, 
    searchQuery, 
    filterStatus, 
    isLoading 
  } = useSelector((state: RootState) => state.tourPackage);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleFilterChange = (status: 'all' | 'available' | 'unavailable') => {
    dispatch(setFilterStatus(status));
  };

  const handleToggleAvailability = (id: number) => {
    dispatch(togglePackageAvailability(id));
  };

  const handleEdit = (package_: TourPackage) => {
    dispatch(openEditModal(package_));
  };

  const handleDelete = (id: number) => {
    dispatch(openDeleteModal(id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Tour Package Management</h2>
            <p className="text-gray-600">Manage your tour packages and settings</p>
          </div>
          {/* <button
            onClick={() => dispatch(openCreateModal())}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Package
          </button> */}
          <div
            className='inline-flex items-center'
          >
            <PrimaryButton
                onClick={() => dispatch(openCreateModal())}
                ButtonDesc="Add New Package"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Packages
            </label>
            <input
              type="text"
              placeholder="Search by title, destination, or description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="lg:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => handleFilterChange(e.target.value as 'all' | 'available' | 'unavailable')}
            >
              <option value="all">All Packages</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package List */}
      <div className="p-6">
        {filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPackages.map((package_) => (
              <div key={package_.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Package Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={package_.imageUrl}
                    alt={package_.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      package_.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {package_.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>

                {/* Package Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{package_.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{package_.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Destination:</span>
                      <span className="text-gray-900">{package_.destination}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="text-gray-900">{package_.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Price per Pax:</span>
                      <span className="text-blue-600 font-semibold">{formatPrice(package_.pricePerPax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Capacity:</span>
                      <span className="text-gray-900">{package_.minPax}-{package_.maxPax} pax</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last Updated:</span>
                      <span className="text-gray-900">{formatDate(package_.updatedAt)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleAvailability(package_.id)}
                      className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        package_.available
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {package_.available ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => handleEdit(package_)}
                      className="px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(package_.id)}
                      className="px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourPackageList;