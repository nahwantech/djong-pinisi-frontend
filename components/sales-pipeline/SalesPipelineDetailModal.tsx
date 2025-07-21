import React from 'react';
import { SalesPipelineCardProps } from './SalesPipelineCard';
import GeneralFunction from '../generals/gengeral-function';

interface SalesPipelineDetailModalProps {
  lead: SalesPipelineCardProps['lead'];
  onClose: () => void;
}

const SalesPipelineDetailModal: React.FC<SalesPipelineDetailModalProps> = ({ lead, onClose }) => {

  const gf = new GeneralFunction();
  
  if (!lead) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{lead.name} - {lead.company}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div className="mb-6">
          <p><span className="font-semibold">Value:</span> IDR {lead.value.toLocaleString()}</p>
          <p><span className="font-semibold">Estimated Close Date:</span> {gf.formatDateTime(new Date(lead.closeDate))}</p>
          <p><span className="font-semibold">Current Stage:</span> {lead.stage}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Lead History</h3>
          <div className="relative">
            <div className="border-l-2 border-gray-200 absolute h-full left-4"></div>
            {lead.history.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center text-white z-10">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{item.stage}</p>
                  <p className="text-sm text-gray-600">{gf.formatDateTime(new Date(item.date))}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPipelineDetailModal;