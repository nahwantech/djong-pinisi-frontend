'use client';

import Ticket from "../generals/basic-ticket-shape";
import TotalPax from "./TotalPax";

export default function TravelerInfo({
    handleDecrement,
    handleInputChange,
    handleIncrement,
    adultQty,
    childQty,
    infQty,
    totalForm, 
    formData,
    travelers,
    handleTravelerChange,
}:{
    handleDecrement: (type: 'adult' | 'child' | 'inf') => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'adult' | 'child' | 'inf') => void
    handleIncrement: (type: 'adult' | 'child' | 'inf') => void
    adultQty: number
    childQty: number
    infQty: number
    totalForm: number
    formData: {
        travelerName: string
        passportNo: string
        email: string
        dateOfBirth: Date
    }
    travelers: Array<{
        travelerName: string
        passportNo: string
        email: string
        dateOfBirth: string
    }>
    handleTravelerChange: (index: number, field: string, value: any) => void
}) {


    // const handlingTicket = (totalTicket: number) => {
    //     return Array.from({ length: totalTicket }, (_, i) => (
    //         <div key={i} className="mt-2 mb-2">
    //             <Ticket 
    //                 travelerNo={i+1}
    //             />
    //         </div>
    //     ));
    // };
    
    const handlingTicket = (totalTicket: number) => {

        // need more variable to handling chid

        if (totalTicket > 0) {
            const paxTypes = [
                ...Array(adultQty).fill("adult"),
                ...Array(childQty).fill("child"),
                ...Array(infQty).fill("infant"),
            ];

            return Array.from({ length: totalTicket }, (_, i) => (
                <div key={i} className="mt-2 mb-2">
                    <Ticket 
                        travelerNo={i+1}
                        paxType={paxTypes[i]}
                        onChange={(field: string, value: any) => handleTravelerChange(i, field, value)}
                        formData={travelers[i] ? {
                            travelerName: travelers[i].travelerName,
                            passportNo: travelers[i].passportNo,
                            email: travelers[i].email,
                            dateOfBirth: new Date(travelers[i].dateOfBirth || new Date())
                        } : formData}
                    />
                </div>
            ));
        }
        
    };
    
    return (
        <div className="mt-2 bg-white w-full max-w-6xl rounded-lg shadow-md p-6">
            <div className="flex flex-row">
                <div className="w-28"><p className="text-md">Traveler Info</p></div>
                <div className="w-full h-1 bg-black" />
            </div>

            {/* Total Pax */}
            <div className="mt-2 mb-2">
                <TotalPax 
                    adultQty={adultQty}
                    childQty={childQty}
                    infQty={infQty}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                    handleInputChange={handleInputChange}
                />
            </div>

            {totalForm > 0 && handlingTicket(totalForm)}
        </div>
    );
}