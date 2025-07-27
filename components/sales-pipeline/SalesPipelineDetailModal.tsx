import React, { useState } from 'react';
import { SalesPipelineCardProps } from './SalesPipelineCard';
import GeneralFunction from '../generals/gengeral-function';

interface SalesPipelineDetailModalProps {
  lead: SalesPipelineCardProps['lead'];
  onClose: () => void;
  onSubmitStory?: (data: { comment: string; stage: string }) => void;
}

const SalesPipelineDetailModal: React.FC<SalesPipelineDetailModalProps> = ({ lead, onClose, onSubmitStory }) => {
  const gf = new GeneralFunction();
  const [comment, setComment] = useState('');
  const [stage, setStage] = useState(lead?.stage || '');
  
  if (!lead) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitStory) {
      onSubmitStory({ comment, stage });
      setComment('');
    }
  };

  const stageOptions = [
    'Initial Contact',
    'Meeting Scheduled',
    'Proposal Sent',
    'Negotiation',
    'Closed Won',
    'Closed Lost'
  ];

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 my-6">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{lead.name} - {lead.company}</h2>
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

          {/* Add Story Form */}
          <div className="mb-6 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Add Story</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
                  Update Stage
                </label>
                <select
                  id="stage"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  {stageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 h-24"
                  placeholder="Add your comment here..."
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit Story
              </button>
            </form>
          </div>

          {/* Lead History Section */}
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

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesPipelineDetailModal;

/* Usage Example */
// <SalesPipelineDetailModal
//   lead={lead}
//   onClose={handleClose}
//   onSubmitStory={(data) => {
//     // Handle the story submission here
//     console.log(data.comment, data.stage);
//     // Make API call or update state as needed
//   }}
// />