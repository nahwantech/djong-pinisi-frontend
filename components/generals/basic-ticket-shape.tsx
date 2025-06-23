'use client'

import { useState } from 'react'
import { Datepicker } from 'flowbite-react';

export default function Ticket() {
    

    return (
      <div className="w-full bg-gray-200 rounded-xl overflow-visible">
        {/* Top Section */}
        <div className="p-5">
            <div className="mb-2 mt-2">
                <label htmlFor="traveler-name" className="block text-sm font-medium text-gray-700">
                  Traveler Name 1
                </label>
                <input
                  type="traveler-name"
                  id="traveler-name"
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
                <label htmlFor="passport-no" className="block text-sm font-medium text-gray-700">
                  Passport No
                </label>
                <input
                  type="passport-no"
                  id="passport-no"
                  className="mt-1 block w-full rounded-md border bg-white border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
            </div>

            <div className="mb-2 mt-2">
                <label htmlFor="passport-no" className="block text-sm font-medium text-gray-700">
                  Traveller Email
                </label>
                <input
                  type="passport-no"
                  id="passport-no"
                  className="mt-1 block w-full rounded-md border bg-white border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
            </div>

            <div className="mb-2 mt-2 relative w-full">
              <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700">
                  Date of birth
              </label>
              <Datepicker id="date-of-birth" className="" />
            </div>          
           
        </div>

        
      </div>
    );
  }
  