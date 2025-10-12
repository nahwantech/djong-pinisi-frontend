// Define interfaces
interface Rate {
  pricePerPax: string;
  maxPax: string;
  minPax: string;
}

interface Package {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  rate: Rate[];
  terms: string;
  available: boolean;
  destination: string;
  duration?: string;
  includes?: string[];
  excludes?: string[];
  itinerary?: string[];
}

// Modal component for package details
export default function PackageDetailModal({ pkg, onClose }: { 
  pkg: Package, 
  onClose: () => void 
}) {
  // Helper function to get the lowest price from rate array
  const getLowestPrice = (rates: Rate[]) => {
    if (!rates || rates.length === 0) return 0;
    return Math.min(...rates.map(r => parseInt(r.pricePerPax)));
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseInt(price) : price;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{pkg.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <img 
          src={pkg.imageUrl} 
          alt={pkg.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">Destination</h3>
            <p>{pkg.destination}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">Description</h3>
            <p>{pkg.description}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">Duration</h3>
            <p>{pkg.duration || 'Contact for details'}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">Pricing Tiers</h3>
            <div className="space-y-2">
              {pkg.rate && pkg.rate.length > 0 ? (
                pkg.rate.map((tier, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span className="text-sm">{tier.minPax} - {tier.maxPax} pax</span>
                    <span className="font-semibold text-blue-600">
                      {formatPrice(tier.pricePerPax)} / pax
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Contact for pricing</p>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Starting from: <span className="font-semibold text-blue-600">
                {formatPrice(getLowestPrice(pkg.rate))} / pax
              </span>
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">Availability</h3>
            <p className={pkg.available ? "text-green-600" : "text-red-500"}>
              {pkg.available ? "Available" : "Not Available"}
            </p>
          </div>

          {/* Package Includes */}
          {pkg.includes && pkg.includes.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800">Package Includes</h3>
              <ul className="list-disc list-inside space-y-1">
                {pkg.includes.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Package Excludes */}
          {pkg.excludes && pkg.excludes.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800">Package Excludes</h3>
              <ul className="list-disc list-inside space-y-1">
                {pkg.excludes.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Itinerary */}
          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800">Itinerary</h3>
              <ul className="space-y-2">
                {pkg.itinerary.map((day, index) => (
                  <li key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {day}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <h3 className="font-semibold text-gray-800">Terms & Conditions</h3>
            <p className="text-sm text-gray-600">{pkg.terms}</p>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button 
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!pkg.available}
            >
              {pkg.available ? "Book Now" : "Sold Out"}
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
