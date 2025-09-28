"use client";
import { useState } from "react";
import Image from "next/image";

interface PackageTourCardProps {
  imageUrl: string;
  title: string;
  description: string;
  pricePerPax: number;
  terms: string;
  available: boolean;
  destination: string;
  onClick?: () => void;
}

export default function PackageTourCard({
  imageUrl,
  title,
  description,
  pricePerPax,
  terms,
  available,
  destination,
  onClick,
}: PackageTourCardProps) {
  const [showTerms, setShowTerms] = useState(false);

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
          <span className="text-lg font-bold text-blue-600">
            IDR {pricePerPax.toLocaleString()}
          </span>
          <span className="text-gray-500"> / pax</span>
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
        <button
          disabled={!available}
          onClick={(e) => e.stopPropagation()}
          className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-semibold ${
            available ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {available ? "Book Now" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}
