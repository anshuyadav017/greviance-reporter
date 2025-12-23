import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, AlertTriangle, Check, ChevronLeft, MapPin, Upload,
    Construction, Trash2, Droplet, Zap, Car, HeartPulse, ShieldAlert, GraduationCap,
    Clock, Info, X, FileText, Loader2
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

// Categories Configuration
const CATEGORIES = [
    { id: 'Roadworks', label: 'Roads & Infrastructure', icon: Construction, desc: 'Potholes, damaged roads, broken sidewalks', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    { id: 'Sanitation', label: 'Sanitation & Waste', icon: Trash2, desc: 'Garbage accumulation, street sweeping', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    { id: 'Water', label: 'Water Supply', icon: Droplet, desc: 'No water, leakage, contaminated water', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { id: 'Electricity', label: 'Electricity & Power', icon: Zap, desc: 'Power cuts, broken streetlights, hanging wires', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { id: 'Transport', label: 'Public Transport', icon: Car, desc: 'Bus delays, route issues, traffic signals', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
    { id: 'Health', label: 'Healthcare & Hospitals', icon: HeartPulse, desc: 'Clinic hygiene, staff unavailability', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    { id: 'Law', label: 'Law & Enforcement', icon: ShieldAlert, desc: 'Public nuisance, unauthorized parking', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { id: 'Education', label: 'School & Education', icon: GraduationCap, desc: 'Facility issues, teacher attendance', color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200' }
];

// Guidelines Configuration
const GUIDELINES = {
    default: [
        { text: "Ensure the issue falls under public jurisdiction.", type: "info" },
        { text: "Do not raise duplicate complaints for the same issue.", type: "warning" },
        { text: "Provide clear photographic evidence if possible.", type: "success" },
        { text: "False reporting may lead to account suspension.", type: "danger" }
    ],
    Roadworks: [
        { text: "Only report public roads (not private societies).", type: "info" },
        { text: "Include landmark details for faster location finding.", type: "success" },
        { text: "Check if road work is already in progress.", type: "warning" },
    ],
};

const GrievanceForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [step, setStep] = useState(1);

    // Check if editing mode
    const isEditMode = location.state?.editMode;
    const existingComplaint = location.state?.complaint;

    const [formData, setFormData] = useState({
        category: null,
        subject: '',
        description: '',
        location: '',
        attachments: []
    });

    // UI States
    const [guidelinesConfirmed, setGuidelinesConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isDraftSaved, setIsDraftSaved] = useState(false);
    const [complaintId, setComplaintId] = useState(null);

    // Initialize formatting if editing
    useEffect(() => {
        if (isEditMode && existingComplaint) {
            // Find category object
            const cat = CATEGORIES.find(c => c.label === existingComplaint.category) || CATEGORIES[0];
            setFormData({
                category: cat,
                subject: existingComplaint.title || existingComplaint.category,
                description: existingComplaint.description || '',
                location: existingComplaint.location || 'Location from previous record',
                attachments: []
            });
            setStep(3); // Jump to details for editing
            setGuidelinesConfirmed(true);
        } else if (location.state?.preSelectedCategory) {
            // Handle pre-selection from Department Page
            const preCatName = location.state.preSelectedCategory;
            // Fuzzy match logic since names might slightly differ ("Sanitation & Waste" vs "Sanitation")
            const cat = CATEGORIES.find(c => c.label.includes(preCatName) || preCatName.includes(c.label) || c.id.toLowerCase() === preCatName.toLowerCase()) || CATEGORIES[0];
            setFormData(prev => ({ ...prev, category: cat }));
            // We stay on Step 1 but with category selected, providing a smoother start
            // Or we could auto-advance:
            // setStep(2); 
        }
    }, [isEditMode, existingComplaint, location.state]);

    // Draft Saving Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            if (formData.subject || formData.description) {
                setIsDraftSaved(true);
                setTimeout(() => setIsDraftSaved(false), 2000); // Flash saved message
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [formData]);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const validateStep3 = () => {
        const newErrors = {};
        if (!formData.subject) newErrors.subject = "Subject is required";
        else if (formData.subject.length < 10) newErrors.subject = "At least 10 characters required";

        if (!formData.description) newErrors.description = "Description is required";

        if (!formData.location) newErrors.location = "Location is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep3()) {
            const firstErrorField = document.querySelector('.error-focus');
            if (firstErrorField) firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                category: formData.category?.label,
                description: formData.description,
                status: isEditMode ? existingComplaint.status : "Pending",
                user: { id: user?.userId || user?.id }, // Ensure User ID is passed
                userImages: formData.userImages || []
                // Add other fields like location, subject if backend supports them directly or pack into description
            };

            let response;
            if (isEditMode) {
                response = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/grievances/update/${existingComplaint.id}`, payload);
            } else {
                response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/grievances/add`, payload);
            }

            setComplaintId(response.data.id || '#GRV-NEW');
            setStep(4); // Success Step

        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit grievance. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const getCurrentGuidelines = () => {
        return GUIDELINES[formData.category?.id] || GUIDELINES.default;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
            <div className="max-w-4xl mx-auto">
                {/* Header & Progress */}
                <div className="mb-10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900">{isEditMode ? 'Edit Grievance' : 'Raise a Grievance'}</h2>
                            <p className="text-gray-500 mt-1">We are here to help you resolve civic issues.</p>
                        </div>
                        {formData.category && step > 1 && (
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${formData.category.bg} ${formData.category.color} ${formData.category.border}`}>
                                <formData.category.icon size={14} />
                                {formData.category.label}
                            </span>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="relative">
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 3) * 100}%` }}
                                transition={{ duration: 0.5 }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#1a472a]"
                            />
                        </div>
                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span className={step >= 1 ? 'text-[#1a472a]' : ''}>1. Category</span>
                            <span className={step >= 2 ? 'text-[#1a472a]' : ''}>2. Guidelines</span>
                            <span className={step >= 3 ? 'text-[#1a472a]' : ''}>3. Details</span>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {/* STEP 1: CATEGORY SELECTION */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                                        className={`group relative p-6 bg-white rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${formData.category?.id === cat.id
                                            ? 'border-[#1a472a] shadow-md ring-1 ring-[#1a472a]'
                                            : 'border-transparent hover:border-gray-200 shadow-sm'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-full w-fit mb-4 ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                                            <cat.icon size={24} />
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-1">{cat.label}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">{cat.desc}</p>

                                        {formData.category?.id === cat.id && (
                                            <div className="absolute top-4 right-4 text-[#1a472a]">
                                                <CheckCircleIcon />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button
                                    disabled={!formData.category}
                                    onClick={handleNext}
                                    className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: GUIDELINES */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className={`p-6 border-b ${formData.category.bg} ${formData.category.border}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full bg-white ${formData.category.color} shadow-sm`}>
                                            <formData.category.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-bold ${formData.category.color}`}>Guidelines for {formData.category.label}</h3>
                                            <p className="text-gray-600 text-sm flex items-center gap-1">
                                                <Clock size={12} /> Takes about 3-5 minutes
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <ul className="space-y-4 mb-8">
                                        {getCurrentGuidelines().map((guide, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                <div className="mt-0.5">
                                                    {guide.type === 'info' && <Info size={18} className="text-blue-500" />}
                                                    {guide.type === 'warning' && <AlertTriangle size={18} className="text-orange-500" />}
                                                    {guide.type === 'success' && <Check size={18} className="text-green-500" />}
                                                    {guide.type === 'danger' && <X size={18} className="text-red-500" />}
                                                </div>
                                                <span className="text-sm font-medium leading-relaxed">{guide.text}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="border-t border-gray-100 pt-6">
                                        <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-colors border-2 ${guidelinesConfirmed ? 'border-green-500 bg-green-50' : 'border-transparent hover:bg-gray-50'}`}>
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={guidelinesConfirmed}
                                                    onChange={(e) => setGuidelinesConfirmed(e.target.checked)}
                                                    className="w-6 h-6 border-2 border-gray-300 rounded text-green-600 focus:ring-green-500 cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-900 block mb-1">I confirm my complaint is valid and truthful.</span>
                                                <span className="text-xs text-gray-500 block">False reporting may result in account suspension.</span>
                                                {guidelinesConfirmed && <span className="text-xs font-bold text-green-600 mt-2 block">✓ Confirmed! Ready to proceed.</span>}
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-center">
                                <button onClick={handleBack} className="text-gray-500 hover:text-gray-800 font-bold flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ChevronLeft size={20} /> Back
                                </button>
                                <button
                                    disabled={!guidelinesConfirmed}
                                    onClick={handleNext}
                                    className="btn-primary px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed group relative"
                                    title={!guidelinesConfirmed ? "Please check the confirmation box above" : ""}
                                >
                                    Proceed to Form
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: DETAILS */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
                                {isDraftSaved && (
                                    <div className="absolute top-4 right-4 text-xs font-medium text-gray-400 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                        <Check size={12} /> Draft saved
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Subject */}
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <label className="text-sm font-bold text-gray-700">Subject <span className="text-red-500">*</span></label>
                                            <span className={`text-xs ${formData.subject.length > 100 ? 'text-red-500' : 'text-gray-400'}`}>{formData.subject.length}/100</span>
                                        </div>
                                        <input
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            maxLength={100}
                                            type="text"
                                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all ${errors.subject ? 'border-red-500 focus:ring-red-200 focus:border-red-500 error-focus' : 'border-gray-300 focus:ring-green-500/20 focus:border-green-600'}`}
                                            placeholder="e.g., Large pothole on Main Street near the library"
                                            aria-label="Complaint subject"
                                        />
                                        {errors.subject && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertTriangle size={12} /> {errors.subject}</p>}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <label className="text-sm font-bold text-gray-700">Description <span className="text-red-500">*</span></label>
                                            <span className={`text-xs ${formData.description.length > 2000 ? 'text-red-500' : 'text-gray-400'}`}>{formData.description.length}/2000</span>
                                        </div>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            maxLength={2000}
                                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all h-40 resize-y ${errors.description ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-gray-300 focus:ring-green-500/20 focus:border-green-600'}`}
                                            placeholder="Provide clear details about the issue. Include what happened, when it happened, and who should be responsible."
                                        ></textarea>
                                        <p className="text-xs text-gray-400 mt-1">Include details like landmark, time of incident, etc.</p>
                                        {errors.description && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertTriangle size={12} /> {errors.description}</p>}
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 block mb-1">Location <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                type="text"
                                                className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all ${errors.location ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-gray-300 focus:ring-green-500/20 focus:border-green-600'}`}
                                                placeholder="Enter address or landmark..."
                                            />
                                            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600 font-medium">
                                                Detect
                                            </button>
                                        </div>
                                        {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
                                    </div>

                                    {/* Attachments Section */}
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 block mb-1">Evidence (Optional)</label>
                                        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer group relative">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files);
                                                    files.forEach(file => {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                userImages: [...(prev.userImages || []), reader.result]
                                                            }));
                                                        };
                                                        reader.readAsDataURL(file);
                                                    });
                                                }}
                                            />
                                            <Upload className="mx-auto text-gray-400 group-hover:text-[#1a472a] mb-2 transition-colors" size={32} />
                                            <p className="text-sm font-medium text-gray-700">Click to upload photos</p>
                                            <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG (Max 5MB)</p>
                                        </div>

                                        {/* Image Previews */}
                                        {formData.userImages && formData.userImages.length > 0 && (
                                            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                                {formData.userImages.map((img, idx) => (
                                                    <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0 relative group">
                                                        <img src={img} alt="evidence" className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, userImages: prev.userImages.filter((_, i) => i !== idx) }))}
                                                            className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Contact & Resolution Info */}
                                    <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                                        <Info className="text-blue-600 mt-0.5" size={18} />
                                        <div className="text-sm text-blue-900">
                                            <p className="mb-1"><strong>Resolution Estimate:</strong> ~30 Days</p>
                                            <p>Updates will be sent to your registered email address.</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4">
                                        <button type="button" onClick={handleBack} className="text-gray-500 hover:text-gray-800 font-bold flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <ChevronLeft size={20} /> Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="btn-primary px-8 py-3 rounded-xl shadow-lg shadow-green-900/20 hover:shadow-xl flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed min-w-[160px] justify-center"
                                        >
                                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isEditMode ? 'Update Complaint' : 'Submit Complaint')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: SUCCESS */}
                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check size={48} className="text-green-600" />
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{isEditMode ? 'Complaint Updated!' : 'Complaint Submitted!'}</h2>
                            <p className="text-lg text-gray-600 mb-8">Your Complaint ID is <span className="font-mono font-bold text-[#1a472a]">#{complaintId}</span></p>

                            <div className="max-w-md mx-auto bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8 text-left">
                                <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">What happens next?</h4>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                                        Assigned to {formData.category?.label} Department.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                                        Field officer will verify the issue within 48 hours.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                                        You will receive automated status updates via email.
                                    </li>
                                </ul>
                            </div>

                            <div className="flex justify-center gap-4">
                                <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                    Go to Dashboard
                                </button>
                                <button onClick={() => { setStep(1); setFormData({ ...formData, subject: '', description: '', location: '', attachments: [] }); }} className="px-6 py-3 bg-[#1a472a] text-white font-bold rounded-xl hover:bg-green-900 transition-colors shadow-lg">
                                    File Another
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const CheckCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#1a472a" fillOpacity="0.1" stroke="#1a472a" strokeWidth="2" />
        <path d="M8 12L11 15L16 9" stroke="#1a472a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default GrievanceForm;
