'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  createTourPackage, 
  updateTourPackage, 
  closeCreateModal, 
  closeEditModal,
  updateFormField,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
  addRateItem,
  removeRateItem,
  updateRateItem,
  resetFormData,
  initializeFormForEdit
} from '@/store/features/tour-package/tourPackageSlice';
import PrimaryButton from '../generals/btns/primary-button';

interface TourPackageFormProps {
  isEdit?: boolean;
}

const TourPackageForm: React.FC<TourPackageFormProps> = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const { 
    isCreateModalOpen, 
    isEditModalOpen, 
    selectedPackage,
    formData,
  } = useSelector((state: RootState) => state.tourPackage);

  const isOpen = isEdit ? isEditModalOpen : isCreateModalOpen;
  const initialData = isEdit && selectedPackage ? selectedPackage : null;

  useEffect(() => {
    if (isEdit && initialData) {
      dispatch(initializeFormForEdit(initialData));
    } else if (!isEdit && isCreateModalOpen) {
      dispatch(resetFormData());
    }
  }, [isEdit, initialData, isOpen, isCreateModalOpen, dispatch]);

  const handleClose = () => {
    if (isEdit) {
      dispatch(closeEditModal());
    } else {
      dispatch(closeCreateModal());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const packageData = {
      ...formData,
      rate: formData.rate.map(r => ({
        pricePerPax: r.pricePerPax,
        maxPax: r.maxPax,
        minPax: r.minPax
      })),
      includes: formData.includes.filter(item => item.trim() !== ''),
      excludes: formData.excludes.filter(item => item.trim() !== ''),
      itinerary: formData.itinerary.filter(item => item.trim() !== '')
    };

    if (isEdit && initialData) {
      dispatch(updateTourPackage({
        ...packageData,
        id: initialData.id,
        createdAt: initialData.createdAt,
        updatedAt: new Date().toISOString()
      }));
    } else {
      dispatch(createTourPackage(packageData));
    }

    handleClose();
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? 'Edit Tour Package' : 'Create New Tour Package'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Title *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => dispatch(updateFormField({ field: 'title', value: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.destination}
                onChange={(e) => dispatch(updateFormField({ field: 'destination', value: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration * (in Days)
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.duration}
                onChange={(e) => dispatch(updateFormField({ field: 'duration', value: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => dispatch(updateFormField({ field: 'description', value: e.target.value }))}
            />
          </div>

          {/* Dynamic Pricing Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Pricing Tiers *
              </label>
              <button
                type="button"
                onClick={() => dispatch(addRateItem())}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                + Add Pricing Tier
              </button>
            </div>
            
            {formData.rate.map((rate, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Pricing Tier {index + 1}
                  </h4>
                  {formData.rate.length > 1 && (
                    <button
                      type="button"
                      onClick={() => dispatch(removeRateItem(index))}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Price per Pax (IDR) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="e.g., 500000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={rate.pricePerPax}
                      onChange={(e) => dispatch(updateRateItem({ index, field: 'pricePerPax', value: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Min Pax *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g., 1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={rate.minPax}
                      onChange={(e) => dispatch(updateRateItem({ index, field: 'minPax', value: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Max Pax *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g., 10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={rate.maxPax}
                      onChange={(e) => dispatch(updateRateItem({ index, field: 'maxPax', value: e.target.value }))}
                    />
                  </div>
                </div>
                
                {rate.minPax && rate.maxPax && (
                  <div className="mt-2 text-xs text-gray-500">
                    This pricing applies to groups of {rate.minPax}-{rate.maxPax} passengers
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.imageUrl}
                onChange={(e) => dispatch(updateFormField({ field: 'imageUrl', value: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Terms & Conditions
            </label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.terms}
              onChange={(e) => dispatch(updateFormField({ field: 'terms', value: e.target.value }))}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.available}
              onChange={(e) => dispatch(updateFormField({ field: 'available', value: e.target.checked }))}
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
              Package is available for booking
            </label>
          </div>

          {/* Dynamic Arrays */}
          {(['includes', 'excludes', 'itinerary'] as const).map((field) => (
            <div key={field}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field === 'includes' ? 'Package Includes' : 
                   field === 'excludes' ? 'Package Excludes' : 'Itinerary'}
                </label>
                <button
                  type="button"
                  onClick={() => dispatch(addArrayItem(field))}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Item
                </button>
              </div>
              <div className="space-y-2">
                {formData[field].map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={item}
                      onChange={(e) => dispatch(updateArrayItem({ field, index, value: e.target.value }))}
                      placeholder={`${field === 'itinerary' ? 'Day ' + (index + 1) + ': ' : ''}Enter item...`}
                    />
                    {formData[field].length > 1 && (
                      <button
                        type="button"
                        onClick={() => dispatch(removeArrayItem({ field, index }))}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <PrimaryButton
                onClick={handleSubmit}
                ButtonDesc={isEdit ? 'Update Package' : 'Create Package'}
            />
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourPackageForm;