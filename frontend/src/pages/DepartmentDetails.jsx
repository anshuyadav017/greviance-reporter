import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, CheckCircle, Clock, Users, Building, Zap, Droplet, Car, Shield, GraduationCap, HeartPulse, Trash2, Construction } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const DEPARTMENTS = {
    'sanitation': {
        name: 'Sanitation & Waste Management',
        icon: Trash2,
        description: 'Responsible for maintaining cleanliness, garbage collection, and waste disposal systems across the city.',
        responsibilities: [
            'Daily garbage collection',
            'Street sweeping and cleaning',
            'Maintenance of public dustbins',
            'Sewage system management'
        ],
        sla: '24-48 Hours',
        rating: 4.5
    },
    'roadworks': {
        name: 'Roads & Infrastructure',
        icon: Construction,
        description: 'Ensures safe and pothole-free roads, sidewalk maintenance, and public infrastructure repairs.',
        responsibilities: [
            'Pothole repairs',
            'Road resurfacing',
            'Sidewalk construction',
            'Drainage system maintenance'
        ],
        sla: '3-7 Days',
        rating: 3.8
    },
    'lighting': {
        name: 'Street Lighting & Power',
        icon: Zap,
        description: 'Manages street lights and public power infrastructure to ensure safety and visibility.',
        responsibilities: [
            'Repairing broken street lights',
            'Installing new poles',
            'Maintaing power grids',
            'Emergency power restoration'
        ],
        sla: '24 Hours',
        rating: 4.2
    },
    'water-supply': {
        name: 'Water Supply',
        icon: Droplet,
        description: 'Ensures clean and continuous water supply to all residential and commercial areas.',
        responsibilities: [
            'Pipeline maintenance',
            'Water quality testing',
            'Leakage repairs',
            'New connection provisions'
        ],
        sla: '12-24 Hours',
        rating: 4.0
    },
    'transport': {
        name: 'Public Transport',
        icon: Car,
        description: 'Manages city buses, traffic signals, and public transit systems.',
        responsibilities: [
            'Bus schedule management',
            'Traffic signal repairs',
            'Bus stop maintenance',
            'Route planning'
        ],
        sla: '2-5 Days',
        rating: 3.9
    },
    'health': {
        name: 'Health & Hospitals',
        icon: HeartPulse,
        description: 'Oversees public healthcare facilities, clinics, and emergency services.',
        responsibilities: [
            'Hospital maintenance',
            'Medicine availability',
            'Staff attendance',
            'Emergency response'
        ],
        sla: 'Immediate',
        rating: 4.7
    },
    'law-order': {
        name: 'Law & Enforcement',
        icon: Shield,
        description: 'Maintains public order, safety, and handles civil disturbances.',
        responsibilities: [
            'Patrolling',
            'Handling public nuisance',
            'Traffic enforcement',
            'Community safety'
        ],
        sla: 'Immediate',
        rating: 4.3
    },
    'education': {
        name: 'Education',
        icon: GraduationCap,
        description: 'Manages public schools, libraries, and educational resources.',
        responsibilities: [
            'School infrastructure repair',
            'Teacher availability',
            'Book distribution',
            'Playground maintenance'
        ],
        sla: '7-14 Days',
        rating: 4.1
    }
};

const DepartmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const dept = DEPARTMENTS[id] || DEPARTMENTS['sanitation']; // Default fallback

    const handleComplaint = () => {
        if (!user) {
            // If not logged in, redirect to login, then to grievance form
            // ideally passing state to redirect back after login, but for now just login
            alert("Please login to file a complaint.");
            navigate('/login');
        } else {
            // Navigate to grievance form with pre-selected category
            // mapping dept id to category label expected by form if needed
            // simplified: passing ID and letting form handle matching
            navigate('/raise-grievance', { state: { preSelectedCategory: dept.name } });
        }
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
                    <div className="p-6 bg-green-50 rounded-3xl text-[#1a472a]">
                        <dept.icon size={64} />
                    </div>
                    <div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="text-[#c5a059] font-bold tracking-widest uppercase text-sm mb-2 block">Department Profile</span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{dept.name}</h1>
                            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">{dept.description}</p>
                        </motion.div>

                        <div className="flex gap-6 mt-8">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 px-4 py-2 rounded-full">
                                <Clock size={16} className="text-[#1a472a]" /> SLA: {dept.sla}
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 px-4 py-2 rounded-full">
                                <CheckCircle size={16} className="text-[#1a472a]" /> Rating: {dept.rating}/5.0
                            </div>
                        </div>
                    </div>
                </div>

                {/* Responsibilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <h3 className="text-2xl font-bold mb-6 text-gray-900">Key Responsibilities</h3>
                        <ul className="space-y-4">
                            {dept.responsibilities.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-600 mt-1 shrink-0" />
                                    <span className="text-gray-700 text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col justify-center items-start p-8">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Is this department failing you?</h3>
                        <p className="text-gray-600 mb-8 text-lg">
                            If you notice delays, negligence, or unresolved issues, it is your right to report it. We track every complaint against the Service Level Agreement (SLA).
                        </p>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl w-full mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <AlertTriangle className="text-red-600" />
                                <h4 className="font-bold text-red-700">Report an Issue</h4>
                            </div>
                            <p className="text-red-600/80 text-sm">
                                Unresolved garbage piles? Broken pipes? Potholes? Raise a ticket now.
                            </p>
                        </div>

                        <button
                            onClick={handleComplaint}
                            className="bg-[#1a472a] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-green-900/20 hover:bg-green-900 hover:scale-105 transition-all w-full md:w-auto flex items-center justify-center gap-2"
                        >
                            Raise a Complaint <ArrowRight />
                        </button>
                    </div>
                </div>

                {/* Performance Stats (Mock) */}
                <div className="border-t border-gray-200 pt-16">
                    <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Performance Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Total Complaints", val: "1,240" },
                            { label: "Resolved On Time", val: "89%" },
                            { label: "Avg Response", val: "4 Hrs" },
                            { label: "Public Satisfaction", val: "4.2/5" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-6 border rounded-2xl bg-white hover:shadow-lg transition-shadow">
                                <div className="text-3xl font-bold text-[#1a472a] mb-1">{stat.val}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepartmentDetails;
