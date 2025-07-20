import React from 'react';

interface SalesPipelineControlsProps {
  onSearch: (query: string) => void;
  onFilter: (stage: string) => void;
  onSort: (order: string) => void;
}

const SalesPipelineControls: React.FC<SalesPipelineControlsProps> = ({ onSearch, onFilter, onSort }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="mb-4 sm:mb-0">
        <input
          type="text"
          placeholder="Search by name or company..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor="filter" className="text-sm font-medium text-gray-700 mr-2">Filter by stage:</label>
          <select
            id="filter"
            onChange={(e) => onFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div>
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
          <select
            id="sort"
            onChange={(e) => onSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="value-desc">Value (High to Low)</option>
            <option value="value-asc">Value (Low to High)</option>
            <option value="closeDate-asc">Close Date (Asc)</option>
            <option value="closeDate-desc">Close Date (Desc)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SalesPipelineControls;