'use client'

import React, { useState, useMemo } from 'react';
import SalesPipelineCard, { SalesPipelineCardProps } from './SalesPipelineCard';
import SalesPipelineControls from './SalesPipelineControls';
import Pagination from '../generals/Pagination';
import SalesPipelineDetailModal from './SalesPipelineDetailModal';

const salesData: SalesPipelineCardProps['lead'][] = [
  {
    id: 1,
    name: 'John Doe',
    company: 'Acme Inc.',
    stage: 'Proposal',
    value: 50000,
    closeDate: '2024-08-15',
    history: [
      { stage: 'Initial Contact', date: '2024-06-01' },
      { stage: 'Qualification', date: '2024-06-15' },
      { stage: 'Proposal', date: '2024-07-01' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'Innovate LLC',
    stage: 'Qualification',
    value: 75000,
    closeDate: '2024-09-01',
    history: [
      { stage: 'Initial Contact', date: '2024-07-10' },
      { stage: 'Qualification', date: '2024-07-20' },
    ],
  },
  {
    id: 3,
    name: 'Sam Wilson',
    company: 'Solutions Co.',
    stage: 'Closed Won',
    value: 120000,
    closeDate: '2024-07-20',
    history: [
      { stage: 'Initial Contact', date: '2024-05-01' },
      { stage: 'Qualification', date: '2024-05-15' },
      { stage: 'Proposal', date: '2024-06-01' },
      { stage: 'Negotiation', date: '2024-06-20' },
      { stage: 'Closed Won', date: '2024-07-20' },
    ],
  },
  {
    id: 4,
    name: 'Lisa Ray',
    company: 'Tech Forward',
    stage: 'Negotiation',
    value: 95000,
    closeDate: '2024-08-25',
    history: [
      { stage: 'Initial Contact', date: '2024-06-10' },
      { stage: 'Qualification', date: '2024-06-25' },
      { stage: 'Proposal', date: '2024-07-10' },
      { stage: 'Negotiation', date: '2024-07-25' },
    ],
  },
    {
    id: 5,
    name: 'Mark Chen',
    company: 'Global Innovations',
    stage: 'Initial Contact',
    value: 30000,
    closeDate: '2024-09-10',
    history: [
      { stage: 'Initial Contact', date: '2024-07-15' },
    ],
  },
  {
    id: 6,
    name: 'Emily White',
    company: 'Future Systems',
    stage: 'Closed Lost',
    value: 60000,
    closeDate: '2024-07-30',
    history: [
      { stage: 'Initial Contact', date: '2024-06-05' },
      { stage: 'Qualification', date: '2024-06-20' },
      { stage: 'Proposal', date: '2024-07-05' },
      { stage: 'Closed Lost', date: '2024-07-30' },
    ],
  },
];

const SalesPipelineList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [sortOrder, setSortOrder] = useState('value-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedLead, setSelectedLead] = useState<SalesPipelineCardProps['lead'] | null>(null);

  const filteredAndSortedData = useMemo(() => {
    let filteredData = salesData;

    if (searchQuery) {
      filteredData = filteredData.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStage) {
      filteredData = filteredData.filter(lead => lead.stage === filterStage);
    }

    const [sortBy, order] = sortOrder.split('-');
    filteredData.sort((a, b) => {
      if (sortBy === 'value') {
        return order === 'asc' ? a.value - b.value : b.value - a.value;
      }
      if (sortBy === 'closeDate') {
        return order === 'asc'
          ? new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime()
          : new Date(b.closeDate).getTime() - new Date(a.closeDate).getTime();
      }
      return 0;
    });

    return filteredData;
  }, [searchQuery, filterStage, sortOrder]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SalesPipelineControls
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        onFilter={(stage) => {
          setFilterStage(stage);
          setCurrentPage(1);
        }}
        onSort={setSortOrder}
      />
      {paginatedData.map((lead) => (
        <SalesPipelineCard key={lead.id} lead={lead} onClick={() => setSelectedLead(lead)} />
      ))}
      {selectedLead && (
        <SalesPipelineDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SalesPipelineList;