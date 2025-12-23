import React from 'react';

const SkipToContent = () => {
    return (
        <a
            href="#main-content"
            className="absolute -top-16 left-4 z-[100] px-6 py-3 bg-green-800 text-white font-bold rounded-b-lg shadow-xl transition-all duration-300 focus:top-0 focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
            Skip to Main Content
        </a>
    );
};

export default SkipToContent;
