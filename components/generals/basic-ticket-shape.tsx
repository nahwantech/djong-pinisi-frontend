'use client'

import { Datepicker } from 'flowbite-react';

export default function Ticket({ 
  travelerNo, 
  paxType,
  formData,
  onChange,
}:{ 
  travelerNo: number
  paxType: string
  formData: {
    travelerName: string
    passportNo: string
    email: string
    dateOfBirth: string
  }
  onChange: (field: string, value: any) => void
}) {
    
    return (
      <div className="w-full bg-gray-200 rounded-xl overflow-visible">
        {/* Top Section */}
        <div className="p-5">
            <div className="mb-2 mt-2">
                <label htmlFor="travelerName" className="block text-sm font-medium text-gray-700">
                  Traveler #{`${travelerNo}`} - {paxType}
                </label>
                <input
                  type="text"
                  id="travelerName"
                  value={formData.travelerName}
                  onChange={(e) => onChange('travelerName', e.target.value)}
                  className="mt-1 block w-full rounded-md border bg-white border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
            </div>            
        </div>
  
        {/* Middle Divider with Cutouts and Dashed Line */}
        <div className="relative flex items-center justify-center p-2">
          {/* Dashed Line that passes through */}
          <div className="absolute w-full border-t-2 border-dashed border-gray-500"></div>
  
          {/* Circular Cutouts */}
          <div className="absolute w-10 h-10 bg-white rounded-full -left-5"></div>
          <div className="absolute w-10 h-10 bg-white rounded-full -right-5"></div>
        </div>
  
        {/* Bottom Section */}
        <div className="p-5">
            <div className="mb-2 mt-2">
                <label htmlFor="passportNo" className="block text-sm font-medium text-gray-700">
                  Passport No
                </label>
                <input
                  type="text"
                  id="passportNo"
                  value={formData.passportNo}
                  onChange={(e) => onChange('passportNo', e.target.value)}
                  className="mt-1 block w-full rounded-md border bg-white border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
            </div>

            <div className="mb-2 mt-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Traveller Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  placeholder='Email'
                  className="mt-1 block w-full rounded-md border bg-white border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
            </div>

            <div className="mb-2 mt-2 relative w-full">
              <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700">
                  Date of birth
              </label>
              <Datepicker 
                id="dateOfBirth"
                value={formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()}
                onChange={(date: Date) =>
                  onChange('dateOfBirth', date.toISOString().split('T')[0])
                }
              />
            </div>          
           
        </div>

        
      </div>
    );
  }
  