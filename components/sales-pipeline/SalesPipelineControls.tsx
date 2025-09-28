import React, { useState } from 'react';
import PrimaryButton from '../generals/btns/primary-button';

interface SalesPipelineControlsProps {
  onSearch: (query: string) => void;
  onFilter: (stage: string) => void;
  onSort: (order: string) => void;
  openInputModal: (isOpen: boolean) => void;
}

const SalesPipelineControls: React.FC<SalesPipelineControlsProps> = ({ 
  onSearch, 
  onFilter, 
  onSort,
  openInputModal 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 bg-white p-4 rounded-lg hover:shadow-lg shadow-md transition-shadow duration-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search company"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Dropdown */}
        <div>
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by stage:</label>
          <select
            id="filter"
            onChange={(e) => onFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Initial Contact">Initial Contact</option>
            <option value="Qualification">Qualification</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
          <select
            id="sort"
            onChange={(e) => onSort(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="value-desc">Value (High to Low)</option>
            <option value="value-asc">Value (Low to High)</option>
            <option value="closeDate-asc">Close Date (Asc)</option>
            <option value="closeDate-desc">Close Date (Desc)</option>
          </select>
        </div>

        {/* Actions Dropdown */}
        <div className="relative self-end">
          
          <PrimaryButton
            onClick={() => setIsOpen(!isOpen)}
            ButtonDesc="Actions"
          />
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-200">
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => {
                      // Add your logic for adding data
                      openInputModal(true);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Add Data
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      // Add your logic for blasting data
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Blast Data
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesPipelineControls;