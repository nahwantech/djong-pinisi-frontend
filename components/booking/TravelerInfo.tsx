// components/booking/TravelerInfo.tsx
'use client';

import Ticket from "../generals/basic-ticket-shape";
import TotalPax from "./TotalPax";

export default function TravelerInfo() {

    return (
        <>
            <div className="mt-2 bg-white w-full max-w-6xl rounded-lg shadow-md p-6">
                <div className="flex flex-row">
                    <div className="w-28"><p className="text-md">Traveler Info</p></div>
                    <div className="w-full h-1 bg-black" />
                </div>

                {/* Total Pax */}
                <div className="mt-2 mb-2">
                    <TotalPax 
                        info="Adult"
                    />
                </div>
                
                <div className="mt-2 mb-2">
                    <Ticket />
                </div>

                 <div className="mt-2 mb-2">
                    <Ticket />
                </div>
                
            </div>
        </>
    )
}