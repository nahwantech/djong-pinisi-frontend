import React, { useState } from 'react';
import { SalesPipelineCardProps } from './SalesPipelineCard';
import GeneralFunction from '../generals/gengeral-function';
import { on } from 'events';

interface SalesPipelineInputModalProps {
    lead: SalesPipelineCardProps['lead'] | null;
    onChangeLeadsValue: (value: string) => void;
    onSelectStatus: (status: string) => void;
    onChangeCompanyName: (companyName: string) => void;
    onChangePIC: (pic: string) => void;
    onClose: () => void;
}

const SalesPipelineInputModal: React.FC<SalesPipelineInputModalProps> = ({
    lead,
    onClose,
    onChangeCompanyName,
    onChangeLeadsValue,
    onSelectStatus,
    onChangePIC,
}) => {

    const gf = new GeneralFunction();
    
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 my-6">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white px-6 py-4 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Input Lead Data</h2>
                        <button 
                            onClick={onClose} 
                            className="text-gray-500 hover:text-gray-800 text-2xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                 {/* Modal Body - Scrollable Content */}
                 <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 py-4">
                    <div className="mb-6">
                        <div>
                            <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name:  
                            </label>
                            <input
                                type="text"
                                id="leadscompanyname"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => onChangeCompanyName(e.target.value) }
                            />
                        </div>
                        <div>
                            <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
                            PIC: 
                            </label>
                            <input
                                type="text"
                                id="leadspic"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => onChangePIC(e.target.value) }
                            />
                        </div>
                        <div>
                            <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
                            Value: 
                            </label>
                            <input
                                type="text"
                                id="leadsvalue"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="IDR"
                                onChange={(e) => onChangeLeadsValue(e.target.value) }
                            />
                        </div>

                        {/* Select Status */}
                        <div>
                            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by stage:</label>
                            <select
                                id="filter"
                                onChange={(e) => onSelectStatus(e.target.value)}
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

                    </div>


                </div>


            </div>
        </div>
    )
}

export default SalesPipelineInputModal;