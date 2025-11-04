"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import PrimaryButton from "../generals/btns/primary-button";
import { setSelectedPackage } from "../../store/features/product/productSlice";

// Define rate interface
interface Rate {
  pricePerPax: string;
  maxPax: string;
  minPax: string;
}

interface PackageTourCardProps {
  imageUrl: string;
  title: string;
  description: string;
  rate: Rate[];
  terms: string;
  available: boolean;
  destination: string;
  onClick?: () => void;
  id: number;
}

export default function PackageTourCard({
  imageUrl,
  title,
  description,
  rate,
  terms,
  available,
  destination,
  onClick,
  id,
}: PackageTourCardProps) {
  const [showTerms, setShowTerms] = useState(false);
  const dispatch = useDispatch();

  // Helper function to get the lowest price from rate array
  const getLowestPrice = (rates: Rate[]) => {
    if (!rates || rates.length === 0) return 0;
    return Math.min(...rates.map(r => parseInt(r.pricePerPax)));
  };

  const lowestPrice = getLowestPrice(rate);

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (available) {
      // Set the selected package in the store
      dispatch(setSelectedPackage({
        id,
        imageUrl,
        title,
        description,
        rate,
        terms,
        available,
        destination,
        duration: '', // You might want to add this to props
        includes: [], // You might want to add this to props
        excludes: [], // You might want to add this to props
        itinerary: [], // You might want to add this to props
        createdAt: '',
        updatedAt: ''
      }));
    }
  };

  return (
    <div 
      className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title & Destination */}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{destination}</p>

        {/* Description */}
        <p className="text-gray-600 mt-2 line-clamp-3">{description}</p>

        {/* Price */}
        <div className="mt-3">
          <span className="text-sm text-gray-500">Starting from</span>
          <div>
            <span className="text-lg font-bold text-blue-600">
              IDR {lowestPrice.toLocaleString()}
            </span>
            <span className="text-gray-500"> / pax</span>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-2">
          {available ? (
            <span className="text-green-600 font-medium">Available</span>
          ) : (
            <span className="text-red-500 font-medium">Not Available</span>
          )}
        </div>

        {/* Terms & Conditions */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowTerms(!showTerms);
          }}
          className="mt-3 text-sm text-blue-500 hover:underline"
        >
          {showTerms ? "Hide Terms" : "View Terms & Conditions"}
        </button>

        {showTerms && (
          <div className="mt-2 text-xs text-gray-500 bg-gray-100 p-2 rounded">
            {terms}
          </div>
        )}

        {/* Book Button */}
        <div className="mt-4 w-full px-4">
          <PrimaryButton
            onClick={handleBookNow}
            ButtonDesc={available ? "Book Now" : "Sold Out"}
            disable={!available}
          />
        </div>
        
        
      </div>
    </div>
  );
}
