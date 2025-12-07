'use client';

export default function ProductBookedReview() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Booking Review</h2>
      <p className="text-gray-700">Thank you for your booking! Please review your details below:</p>
      {/* Add more booking review details here */}

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800">Destination</h3>
          <p>Bali Indonesia</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Description</h3>
          <p>Experience the serene beaches and vibrant culture of Bali with our exclusive tour package.</p>
        </div>

        <div>
            <h3 className="font-semibold text-gray-800">Duration</h3>
            <p>4 Days 3 Nights</p>
        </div>

        {/* Itinerary */ }
        <div>
          <h3 className="font-semibold text-gray-800">Itinerary</h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600 bg-gray-50 p-2 rounded">Day 1: Arrival and Beach Relaxation</li>
            <li className="text-sm text-gray-600 bg-gray-50 p-2 rounded">Day 2: Ubud Cultural Tour</li>
            <li className="text-sm text-gray-600 bg-gray-50 p-2 rounded">Day 3: Temple Visits and Sunset Dinner</li>
            <li className="text-sm text-gray-600 bg-gray-50 p-2 rounded">Day 4: Departure</li>
          </ul>
        </div>

        {/* Price Inclusions */ }
        <div>
          <h3 className="font-semibold text-gray-800">Price Inclusions</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li className="text-sm text-gray-600">Accommodation in 4-star hotels</li>
            <li className="text-sm text-gray-600">Daily breakfast</li>
            <li className="text-sm text-gray-600">Guided tours and entrance fees</li>
            <li className="text-sm text-gray-600">Airport transfers</li>
          </ul>
        </div>

        {/* Price Exclusions */ }
        <div>
          <h3 className="font-semibold text-gray-800">Price Exclusions</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li className="text-sm text-gray-600">International Flights</li>
            <li className="text-sm text-gray-600">Travel Insurance</li>
            <li className="text-sm text-gray-600">Personal Shopping</li>
            <li className="text-sm text-gray-600">Optional Activities</li>
          </ul>
        </div>
          
      </div>

    </div>
  );
}