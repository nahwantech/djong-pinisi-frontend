import React, { useState } from 'react';
import { SalesPipelineCardProps } from './SalesPipelineCard';
import GeneralFunction from '../generals/gengeral-function';

interface SalesPipelineInputModalProps {
    lead: SalesPipelineCardProps['lead'] | null;
    onClose: () => void;
}

const SalesPipelineInputModal: React.FC<SalesPipelineInputModalProps> = ({
    lead,
    onClose,
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
                        <p><span className="font-semibold">Value:</span> IDR {lead.value.toLocaleString()}</p>
                        <p><span className="font-semibold">Estimated Close Date:</span> {gf.formatDateTime(new Date(lead.closeDate))}</p>
                        <p><span className="font-semibold">Current Stage:</span> {lead.stage}</p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SalesPipelineInputModal;