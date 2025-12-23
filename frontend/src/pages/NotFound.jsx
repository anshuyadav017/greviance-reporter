import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
            >
                <h1 className="text-9xl font-bold text-green-100 font-serif">404</h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#1a472a]">Page Not Found</span>
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 max-w-md mb-8 text-lg"
            >
                We couldn't find the page you were looking for. It might have been moved or doesn't exist.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
            >
                <Link to="/" className="flex items-center gap-2 px-6 py-3 bg-[#1a472a] text-white rounded-xl font-bold hover:bg-green-900 transition-colors shadow-lg">
                    <Home size={20} /> Go Home
                </Link>
                <button onClick={() => window.history.back()} className="flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                    <ArrowLeft size={20} /> Go Back
                </button>
            </motion.div>
        </div>
    );
};

export default NotFound;
