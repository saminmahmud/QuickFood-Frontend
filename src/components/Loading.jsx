import React from "react";

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 backdrop-blur-xl flex justify-center bg-black items-center">
            <div className="animate-spin rounded-full h-14 w-14 border-b-3 border-gray-50">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
