import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import authIllustration from '../assets/auth_authority.png';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', mobileNumber: '' });
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateField = (name, value) => {
        let err = '';
        if (name === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) err = 'Please enter a valid email address.';
        }
        if (name === 'password') {
            if (value.length < 6) err = 'Password must be at least 6 characters.';
        }
        if (name === 'mobileNumber') {
            if (!/^\d{10}$/.test(value)) err = 'Mobile number must be 10 digits.';
        }
        if (name === 'fullName') {
            if (value.length < 3) err = 'Name must be at least 3 characters.';
        }
        return err;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const err = validateField(name, value);
        setFormErrors(prev => ({ ...prev, [name]: err }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation
        const errors = {};
        Object.keys(formData).forEach(key => {
            const err = validateField(key, formData[key]);
            if (err) errors[key] = err;
        });
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/register`, formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                // Ideally show success toast
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50 relative overflow-hidden pt-20">
            {/* Left Side - Modern Illustration & Branding (Same as Login for consistency) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1a472a] items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                {/* Animated Circles/Decor */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-400/20 rounded-full blur-3xl"
                />

                <div className="relative z-10 p-12 text-center max-w-lg">
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        src={authIllustration}
                        alt="Join the Network"
                        className="w-full h-auto mb-8 drop-shadow-2xl"
                        style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-4xl font-serif font-bold text-[#c5a059] mb-4">Join the Movement</h2>
                        <p className="text-green-100/80 text-lg leading-relaxed">
                            Create an account to start reporting issues and tracking their resolution in real-time.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
                {/* Mobile Background Elements */}
                <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-50 to-white -z-10"></div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md w-full bg-white md:bg-transparent md:p-0 p-8 rounded-2xl md:rounded-none shadow-xl md:shadow-none"
                >
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck className="w-8 h-8 text-[#1a472a]" />
                            <span className="text-sm font-bold tracking-widest text-[#c5a059] uppercase">Civil Grievance</span>
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-500">Enter your details to register.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm flex items-center gap-2"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1a472a] transition-colors" />
                                    <input
                                        name="fullName"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a472a]/20 transition-all ${formErrors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1a472a]'}`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                {formErrors.fullName && <p className="text-xs text-red-500 ml-1">{formErrors.fullName}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1a472a] transition-colors" />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a472a]/20 transition-all ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1a472a]'}`}
                                        placeholder="john@example.com"
                                    />
                                </div>
                                {formErrors.email && <p className="text-xs text-red-500 ml-1">{formErrors.email}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Mobile Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1a472a] transition-colors" />
                                    <input
                                        name="mobileNumber"
                                        type="tel"
                                        required
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a472a]/20 transition-all ${formErrors.mobileNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1a472a]'}`}
                                        placeholder="9876543210"
                                    />
                                </div>
                                {formErrors.mobileNumber && <p className="text-xs text-red-500 ml-1">{formErrors.mobileNumber}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1a472a] transition-colors" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a472a]/20 transition-all ${formErrors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1a472a]'}`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {formErrors.password && <p className="text-xs text-red-500 ml-1">{formErrors.password}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1a472a] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#1a472a]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Sign Up
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>

                        <div className="text-center mt-8 text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-[#1a472a] hover:text-[#c5a059] transition-colors">
                                Login here
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
