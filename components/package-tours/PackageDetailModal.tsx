// Modal component for package details
export default function PackageDetailModal({ pkg, onClose }: { 
  pkg: any, 
  onClose: () => void 
}) {
  return (
    <div className="fixed inset-0 shadow-lg flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{pkg.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
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
            <h3 className="font-semibold text-gray-800">Price</h3>
            <p className="text-2xl font-bold text-blue-600">
              IDR {pkg.pricePerPax.toLocaleString()} / pax
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">Availability</h3>
            <p className={pkg.available ? "text-green-600" : "text-red-500"}>
              {pkg.available ? "Available" : "Not Available"}
            </p>
          </div>
          
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
