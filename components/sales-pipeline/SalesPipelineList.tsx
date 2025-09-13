'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SalesPipelineCard from './SalesPipelineCard';
import SalesPipelineControls from './SalesPipelineControls';
import Pagination from '../generals/Pagination';
import SalesPipelineDetailModal from './SalesPipelineDetailModal';
import SalesPipelineInputModal from './SalesPipelineInputModal';
import { RootState } from '../../store/store';
import {
  setSearchQuery,
  setFilterStage,
  setSortOrder,
  setCurrentPage,
  setSelectedLead,
  setIsInputModalOpen,
  setLeadValue,
  setLeadPaxName,
  setLeadPIC,
  setLeadStage
} from '../../store/features/sales-pipeline/salesPipelineSlice';

const SalesPipelineList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    currentPage,
    selectedLead,
    isInputModalOpen,
    paginatedData,
    filteredAndSortedData,
    itemsPerPage
  } = useSelector((state: RootState) => state.salesPipeline);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SalesPipelineControls
        onSearch={(query) => dispatch(setSearchQuery(query))}
        onFilter={(stage) => dispatch(setFilterStage(stage))}
        onSort={(order) => dispatch(setSortOrder(order))}
        openInputModal={() => dispatch(setIsInputModalOpen(true))}
      />
      
      {isInputModalOpen && (
        <SalesPipelineInputModal 
          onClose={() => dispatch(setIsInputModalOpen(false))}
          lead={{
            id: 0,
            name: '',
            paxname: '',
            stage: 'Initial Contact',
            value: 0,
            closeDate: '',
            comment: '',
            history: []
          }}
          onChangeLeadsValue={(value) => dispatch(setLeadValue(value))}
          onChangePaxName={(paxname) => dispatch(setLeadPaxName(paxname))}
          onChangePIC={(pic) => dispatch(setLeadPIC(pic))}
          onSelectStatus={(stage) => dispatch(setLeadStage(stage))}
          isLoading={(isLoading) => dispatch({ type: 'salesPipeline/setIsModalInputLoading', payload: isLoading })}
        />
      )}
      
      {paginatedData.map((lead) => (
        <SalesPipelineCard 
          key={lead.id} 
          lead={lead} 
          onClick={() => dispatch(setSelectedLead(lead))} 
        />
      ))}
      
      {selectedLead && (
        <SalesPipelineDetailModal 
          lead={selectedLead} 
          onClose={() => dispatch(setSelectedLead(null))} 
        />
      )}
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default SalesPipelineList;
