'use client'

import React from "react";

const GeneralLoadingPage: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="relative">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin">
                    <div className="absolute w-16 h-16 border-t-4 border-blue-300 border-solid rounded-full animate-ping opacity-70"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default GeneralLoadingPage;
