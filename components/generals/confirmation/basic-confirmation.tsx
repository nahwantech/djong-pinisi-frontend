'use client';

export default function BasicConfirmation({
    title,
    message,
    onConfirm,
    onCancel,
}:{
    title: string,
    message: string,
    onConfirm: any,
    onCancel: any,
}){
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-100">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}