import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Activity, CheckCircle, XCircle, Plus, Search, Filter, Info, TrendingUp, TrendingDown, Edit2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [greeting, setGreeting] = useState('Welcome back');

    const [selectedGrievance, setSelectedGrievance] = useState(null);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        const fetchComplaints = async () => {
            try {
                const userId = user?.userId || user?.id; // backend might send userId or id
                if (userId) {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/grievances/user/${userId}`);
                    setComplaints(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch complaints", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchComplaints();
    }, [user]);

    const handleEdit = (complaint) => {
        navigate('/raise-grievance', { state: { editMode: true, complaint } });
    };

    const SkeletonLoader = () => (
        <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl w-full"></div>
            ))}
        </div>
    );

    return (
        <div className="p-8 md:p-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-gray-900">
                            {greeting}, {user?.fullName?.split(' ')[0] || 'Citizen'}
                        </h2>
                        <p className="text-gray-500 mt-1">Here is the latest update on your grievance reports.</p>
                    </div>
                    <Link to="/raise-grievance">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#1a472a] text-white px-6 py-3 rounded-xl font-bold font-sans shadow-lg shadow-green-900/20 hover:bg-green-900 hover:shadow-xl transition-all flex items-center gap-2"
                        >
                            <Plus size={20} />
                            New Complaint
                        </motion.button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        title="Total Filed"
                        value={complaints.length}
                        icon={<FileText className="text-white" />}
                        bg="bg-gradient-to-br from-gray-700 to-gray-900"
                        trend="+1 this week" // Mock data
                        tooltip="Total number of complaints you have submitted."
                    />
                    <StatCard
                        title="In Progress"
                        value={complaints.filter(c => c.status === 'Pending').length}
                        icon={<Activity className="text-white" />}
                        bg="bg-gradient-to-br from-yellow-500 to-orange-600"
                        trend="Waiting for action"
                        tooltip="Complaints currently being reviewed by officers."
                    />
                    <StatCard
                        title="Resolved"
                        value={complaints.filter(c => c.status === 'Resolved').length}
                        icon={<CheckCircle className="text-white" />}
                        bg="bg-gradient-to-br from-green-500 to-emerald-700"
                        trend="98% success rate"
                        tooltip="Complaints that have been successfully addressed."
                    />
                    <StatCard
                        title="Rejected"
                        value={complaints.filter(c => c.status === 'Rejected').length}
                        icon={<XCircle className="text-white" />}
                        bg="bg-gradient-to-br from-red-500 to-pink-700"
                        trend="Check comments"
                        tooltip="Complaints that could not be processed."
                    />
                </div>

                {/* Filter & Search Bar - (UI Only for now) */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search complaints..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-600 transition-colors">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                </div>

                {/* Complaints List */}
                <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    Recent Activity
                    <span className="text-xs font-normal text-gray-500 px-2 py-1 bg-gray-100 rounded-full">Last 30 days</span>
                </h3>

                <div className="space-y-4">
                    {loading ? (
                        <SkeletonLoader />
                    ) : complaints.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200"
                        >
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="text-green-600 w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No complaints filed yet</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-8">
                                Be the change you want to see. Report issues in your community effectively and track their resolution.
                            </p>
                            <Link to="/raise-grievance">
                                <button className="bg-[#1a472a] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-green-900/10 hover:shadow-xl hover:-translate-y-1 transition-all">
                                    File Your First Complaint
                                </button>
                            </Link>
                        </motion.div>
                    ) : (
                        complaints.map((complaint) => (
                            <motion.div
                                key={complaint.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.01 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between group transition-all hover:shadow-md cursor-pointer"
                                onClick={() => setSelectedGrievance(complaint)}
                            >
                                <div className="flex-1 w-full">
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="font-mono font-bold text-gray-500 text-xs tracking-widest bg-gray-100 px-2 py-1 rounded">#{complaint.id}</span>
                                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${statusColors(complaint.status)}`}>
                                            <span className={`w-2 h-2 rounded-full ${statusDot(complaint.status)}`}></span>
                                            {complaint.status || 'Pending'}
                                        </div>
                                        <span className="text-xs text-gray-400 ml-auto md:ml-0 flex items-center gap-1">
                                            <Activity size={12} /> {new Date(complaint.dateRaised || Date.now()).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-800 transition-colors">{complaint.category || complaint.title}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-1">{complaint.description}</p>
                                    {complaint.status === 'Rejected' && complaint.rejectionReason && (
                                        <div className="mt-2 text-xs bg-red-50 text-red-700 p-2 rounded border border-red-100 flex items-start gap-1">
                                            <Info size={14} className="mt-0.5 shrink-0" />
                                            <span><strong>Reason:</strong> {complaint.rejectionReason}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-8 flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                                    {complaint.status === 'Pending' && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleEdit(complaint); }}
                                            className="text-sm font-semibold text-gray-500 hover:text-[#1a472a] hover:underline flex items-center gap-1 mr-4"
                                        >
                                            <Edit2 size={14} /> Edit
                                        </button>
                                    )}
                                    <button onClick={(e) => { e.stopPropagation(); setSelectedGrievance(complaint); }} className="text-sm font-semibold text-green-700 hover:text-green-900 hover:underline">View Details</button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Details Modal */}
                {selectedGrievance && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedGrievance(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono font-bold text-gray-500 text-sm tracking-widest bg-gray-100 px-3 py-1 rounded-lg">#{selectedGrievance.id}</span>
                                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${statusColors(selectedGrievance.status)}`}>
                                                <span className={`w-2 h-2 rounded-full ${statusDot(selectedGrievance.status)}`}></span>
                                                {selectedGrievance.status || 'Pending'}
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-serif font-bold text-gray-900">{selectedGrievance.category || selectedGrievance.title}</h2>
                                        <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                                            <Activity size={14} /> Raised on {new Date(selectedGrievance.dateRaised || Date.now()).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedGrievance(null)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <XCircle size={24} className="text-gray-400" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Description */}
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                            <FileText size={16} className="text-gray-400" />
                                            Description
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {selectedGrievance.description}
                                        </p>
                                    </div>

                                    {/* Location (if available) */}
                                    {selectedGrievance.location && (
                                        <div className="flex items-start gap-4 p-4 bg-blue-50 text-blue-900 rounded-xl">
                                            <div className="mt-0.5">
                                                <Info size={18} className="text-blue-500" />
                                            </div>
                                            <div>
                                                <span className="font-bold block text-sm">Location</span>
                                                <span className="text-sm opacity-90">{selectedGrievance.location}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Admin Response Section (Resolved/Rejected) */}
                                    {selectedGrievance.status === 'Resolved' && (
                                        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">
                                            <h4 className="text-sm font-bold text-green-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                                                <CheckCircle size={16} />
                                                Official Resolution
                                            </h4>
                                            <p className="text-green-900 mb-4">{selectedGrievance.resolutionNote || 'This issue has been successfully resolved.'}</p>
                                            {selectedGrievance.adminImages && selectedGrievance.adminImages.length > 0 && (
                                                <div className="mt-4">
                                                    <p className="text-xs font-bold text-green-700 mb-2 uppercase">Proof of Resolution</p>
                                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                                        {selectedGrievance.adminImages.map((img, i) => (
                                                            <img key={i} src={img} alt="Resolution Proof" className="w-24 h-24 object-cover rounded-lg border border-green-200 shadow-sm hover:scale-105 transition-transform cursor-pointer" />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {selectedGrievance.status === 'Rejected' && (
                                        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
                                            <h4 className="text-sm font-bold text-red-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                                                <XCircle size={16} />
                                                Rejection Reason
                                            </h4>
                                            <p className="text-red-900">{selectedGrievance.rejectionReason || 'This grievance was rejected by the authority.'}</p>
                                        </div>
                                    )}

                                    {/* User Attachments */}
                                    {selectedGrievance.userImages && selectedGrievance.userImages.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Your Evidence</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {selectedGrievance.userImages.map((img, i) => (
                                                    <img key={i} src={img} alt="Evidence" className="w-full h-32 object-cover rounded-xl border border-gray-200 shadow-sm hover:opacity-90 transition-opacity" />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center rounded-b-3xl">
                                <span className="text-xs text-gray-400 font-medium">
                                    Last filtered: {new Date().toLocaleTimeString()}
                                </span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setSelectedGrievance(null)}
                                        className="px-5 py-2.5 text-gray-600 font-bold bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        Close
                                    </button>
                                    {selectedGrievance.status === 'Pending' && (
                                        <button
                                            onClick={() => {
                                                handleEdit(selectedGrievance);
                                                setSelectedGrievance(null);
                                            }}
                                            className="px-6 py-2.5 bg-[#1a472a] text-white font-bold rounded-xl shadow-lg shadow-green-900/20 hover:bg-green-900 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                                        >
                                            <Edit2 size={16} />
                                            Edit Complaint
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

const statusColors = (status) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        case 'Resolved': return 'bg-green-50 text-green-700 border-green-200';
        case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
        default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
};

const statusDot = (status) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-500';
        case 'Resolved': return 'bg-green-500';
        case 'Rejected': return 'bg-red-500';
        default: return 'bg-gray-500';
    }
};

const StatCard = ({ title, value, bg, icon, trend, tooltip }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`relative overflow-hidden p-6 rounded-3xl shadow-lg text-white ${bg}`}
    >
        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 bg-white rounded-full"></div>
        </div>

        <div className="flex justify-between items-start relative z-10">
            <div>
                <div className="flex items-center gap-2 mb-2 opacity-90">
                    <p className="text-sm font-medium">{title}</p>
                    <div className="group relative">
                        <Info size={14} className="cursor-help" />
                        <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-48 bg-gray-900 text-white text-xs p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                            {tooltip}
                        </div>
                    </div>
                </div>
                <h3 className="text-4xl font-bold mb-2">{value === 0 ? <span className="text-lg opacity-70">0 filed</span> : value}</h3>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                {icon}
            </div>
        </div>

        {trend && (
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold bg-white/10 w-fit px-2 py-1 rounded-lg backdrop-blur-sm">
                <TrendingUp size={12} />
                {trend}
            </div>
        )}
    </motion.div>
);

export default Dashboard;
