'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  createTourPackage, 
  updateTourPackage, 
  closeCreateModal, 
  closeEditModal 
} from '@/store/features/tour-package/tourPackageSlice';

interface TourPackageFormProps {
  isEdit?: boolean;
}

const TourPackageForm: React.FC<TourPackageFormProps> = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const { 
    isCreateModalOpen, 
    isEditModalOpen, 
    selectedPackage 
  } = useSelector((state: RootState) => state.tourPackage);

  const isOpen = isEdit ? isEditModalOpen : isCreateModalOpen;
  const initialData = isEdit && selectedPackage ? selectedPackage : null;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination: '',
    duration: '',
    pricePerPax: '',
    maxPax: '',
    minPax: '',
    imageUrl: '',
    terms: '',
    available: true,
    includes: [''],
    excludes: [''],
    itinerary: ['']
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        destination: initialData.destination,
        duration: initialData.duration,
        pricePerPax: initialData.pricePerPax.toString(),
        maxPax: initialData.maxPax.toString(),
        minPax: initialData.minPax.toString(),
        imageUrl: initialData.imageUrl,
        terms: initialData.terms,
        available: initialData.available,
        includes: initialData.includes,
        excludes: initialData.excludes,
        itinerary: initialData.itinerary
      });
    } else {
      // Reset form for create mode
      setFormData({
        title: '',
        description: '',
        destination: '',
        duration: '',
        pricePerPax: '',
        maxPax: '',
        minPax: '',
        imageUrl: '',
        terms: '',
        available: true,
        includes: [''],
        excludes: [''],
        itinerary: ['']
      });
    }
  }, [isEdit, initialData, isOpen]);

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
      pricePerPax: parseInt(formData.pricePerPax),
      maxPax: parseInt(formData.maxPax),
      minPax: parseInt(formData.minPax),
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

  const addArrayItem = (field: 'includes' | 'excludes' | 'itinerary') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'includes' | 'excludes' | 'itinerary', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: 'includes' | 'excludes' | 'itinerary', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Title *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
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
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 5 Days 4 Nights"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Pax *
              </label>
              <input
                type="number"
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.minPax}
                onChange={(e) => setFormData(prev => ({ ...prev, minPax: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Pax *
              </label>
              <input
                type="number"
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.maxPax}
                onChange={(e) => setFormData(prev => ({ ...prev, maxPax: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per Pax (IDR) *
              </label>
              <input
                type="number"
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.pricePerPax}
                onChange={(e) => setFormData(prev => ({ ...prev, pricePerPax: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
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
              onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.available}
              onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
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
                  onClick={() => addArrayItem(field)}
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
                      onChange={(e) => updateArrayItem(field, index, e.target.value)}
                      placeholder={`${field === 'itinerary' ? 'Day ' + (index + 1) + ': ' : ''}Enter item...`}
                    />
                    {formData[field].length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(field, index)}
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
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEdit ? 'Update Package' : 'Create Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourPackageForm;