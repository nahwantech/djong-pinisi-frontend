// components/booking/PicInfo.tsx
'use client'; // This directive is necessary for client-side interactivity in App Router

export default function PicInfo() {

    return(
        <>
            <div className="mt-2 bg-white w-full max-w-6xl rounded-lg shadow-md p-6">
                <div className="flex flex-row">
                    <div className="w-28"><p className="text-md">PIC Info</p></div>
                    <div className="w-full h-1 bg-black" />
                </div>

                {/* Form PIC Info */}
                <form className="w-full pt-2">
                    {/* <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Status
                        </label>
                        <input
                        type="text"
                        id="status"
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div> */}

                    <div className="mb-2 mt-2">
                        <label htmlFor="options" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            id="options"
                            name="options"
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">On Booking</option>
                            <option value="option1">Reserved</option>
                            <option value="option2">All Confirmed</option>
                            <option value="option3">Issue</option>
                        </select>
                    </div>

                    <div className="mb-2 mt-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                        </label>
                        <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-2 mt-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                        </label>
                        <input
                        type="phone"
                        id="phone"
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-2 mt-2 flex flex-row">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-medium m-1 rounded-md hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-medium m-1 rounded-md hover:bg-blue-700 transition"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
