'use client'

import React, { useState, useMemo } from 'react';
import SalesPipelineCard, { SalesPipelineCardProps } from './SalesPipelineCard';
import SalesPipelineControls from './SalesPipelineControls';
import Pagination from '../generals/Pagination';
import SalesPipelineDetailModal from './SalesPipelineDetailModal';
import SalesPipelineInputModal from './SalesPipelineInputModal';

const salesData: SalesPipelineCardProps['lead'][] = [
  {
    id: 1,
    name: 'John Doe',
    company: 'PT Bangun Cipta',
    stage: 'Proposal',
    value: 50000,
    closeDate: '2024-08-15T14:30:45',
    comment: 'Looking forward to the proposal review.',
    history: [
      { stage: 'Initial Contact', date: '2024-06-01T09:15:30', comment: 'Reached out via email.' },
      { stage: 'Qualification', date: '2024-06-15T11:45:10', comment: 'Qualified lead after initial call.' },
      { stage: 'Proposal', date: '2024-07-01T16:20:05', comment: 'Sent proposal, awaiting feedback.' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'Nestle Ltd.',
    stage: 'Qualification',
    value: 75000,
    closeDate: '2024-09-01T10:05:55',
    comment: 'Awaiting feedback on the initial proposal.',
    history: [
      { stage: 'Initial Contact', date: '2024-07-10T08:40:12', comment: 'Introductory meeting scheduled.' },
      { stage: 'Qualification', date: '2024-07-20T15:22:35', comment: 'Lead qualified, needs proposal.' },
    ],
  },
  {
    id: 3,
    name: 'Sam Wilson',
    company: 'PT Bahagia dan Untung',
    stage: 'Closed Won',
    value: 120000,
    closeDate: '2024-07-20T18:10:50',
    comment: 'Successfully closed the deal.',
    history: [
      { stage: 'Initial Contact', date: '2024-05-01T07:55:20', comment: 'Cold call, positive response.' },
      { stage: 'Qualification', date: '2024-05-15T13:30:45', comment: 'Lead qualified, high potential.' },
      { stage: 'Proposal', date: '2024-06-01T09:20:00', comment: 'Proposal sent, awaiting decision.' },
      { stage: 'Negotiation', date: '2024-06-20T14:50:10', comment: 'Negotiated terms and pricing.' },
      { stage: 'Closed Won', date: '2024-07-20T18:10:50', comment: 'Deal signed and closed.' },
    ],
  },
  {
    id: 4,
    name: 'Lisa Ray',
    company: 'Personal',
    stage: 'Negotiation',
    value: 95000,
    closeDate: '2024-08-25T12:45:30',
    comment: 'Negotiating terms before finalizing the deal.',
    history: [
      { stage: 'Initial Contact', date: '2024-06-10T09:00:05', comment: 'Contacted via referral.' },
      { stage: 'Qualification', date: '2024-06-25T11:30:25', comment: 'Qualified after needs analysis.' },
      { stage: 'Proposal', date: '2024-07-10T14:20:40', comment: 'Proposal sent, under review.' },
      { stage: 'Negotiation', date: '2024-07-25T17:35:50', comment: 'Negotiating contract details.' },
    ],
  },
  {
    id: 5,
    name: 'Mark Chen',
    company: 'Personal',
    stage: 'Initial Contact',
    value: 30000,
    closeDate: '2024-09-10T16:20:15',
    comment: 'Just started the conversation.',
    history: [
      { stage: 'Initial Contact', date: '2024-07-15T08:50:35', comment: 'First meeting scheduled.' },
    ],
  },
  {
    id: 6,
    name: 'Emily White',
    company: 'Sun Bright & Co.',
    stage: 'Closed Lost',
    value: 60000,
    closeDate: '2024-07-30T19:55:00',
    comment: 'Unfortunately, the deal did not go through.',
    history: [
      { stage: 'Initial Contact', date: '2024-06-05T09:40:45', comment: 'Initial call, interest shown.' },
      { stage: 'Qualification', date: '2024-06-20T10:25:20', comment: 'Qualified, but budget concerns.' },
      { stage: 'Proposal', date: '2024-07-05T13:15:10', comment: 'Proposal sent, awaiting approval.' },
      { stage: 'Closed Lost', date: '2024-07-30T19:55:00', comment: 'Client chose competitor.' },
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
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

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
        openInputModal={() => setIsInputModalOpen(true)}
      />
      
      {/* Input Modal */}
      {isInputModalOpen && (
        <SalesPipelineInputModal onClose={() => setIsInputModalOpen(false)} lead={{
          id: 0,
          name: '',
          company: '',
          stage: 'Initial Contact',
          value: 0,
          closeDate: '',
          comment: '',
          history: []
        }} />
      )}
      
      
      
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
