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
    setAdultQty,
    setChildQty,
    setInfQty,
    totalForm, 
    setTotalForm,
}:{
    handleDecrement: any,
    handleInputChange: any,
    handleIncrement: any,
    adultQty: number,
    childQty: number,
    infQty: number,
    setAdultQty: any,
    setChildQty: any,
    setInfQty: any,
    totalForm: number, 
    setTotalForm: any,
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

            return paxTypes.map((type, index) => (
                <div key={index} className="mt-2 mb-2">
                    <Ticket 
                        travelerNo={index + 1} 
                        paxType={type} 
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
                    setAdultQty={setAdultQty}
                    setChildQty={setChildQty}
                    setInfQty={setInfQty}
                    onClickSetForm={() => setTotalForm(adultQty + childQty + infQty)}
                />
            </div>

            {totalForm > 0 && handlingTicket(totalForm)}
        </div>
    );
}