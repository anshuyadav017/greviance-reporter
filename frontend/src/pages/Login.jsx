import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle, Loader2, HelpCircle } from 'lucide-react';
import authIllustration from '../assets/auth_authority.png';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetStatus, setResetStatus] = useState(null); // 'success' | 'error' | null

    const validateField = (name, value) => {
        let err = '';
        if (name === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) err = 'Please enter a valid email address.';
        }
        if (name === 'password' && !isResetting) {
            if (value.length < 6) err = 'Password must be at least 6 characters.';
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

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            setResetStatus('error');
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setResetStatus('success');
        }, 1500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation
        const emailErr = validateField('email', formData.email);
        const passErr = validateField('password', formData.password);
        if (emailErr || passErr) {
            setFormErrors({ email: emailErr, password: passErr });
            return;
        }

        setIsLoading(true);
        setError('');

        // Mock Admin Login (Backdoor for demo/testing)
        if (formData.email === 'sachinadmin@civil.gov' && formData.password === 'goog admin 124') {
            setTimeout(() => {
                const adminUser = {
                    id: 999,
                    email: 'sachinadmin@civil.gov',
                    fullName: 'System Administrator',
                    role: 'ADMIN'
                };
                login(adminUser);
                navigate('/admin');
                setIsLoading(false);
            }, 1000);
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/login`, formData);
            if (response.data) {
                login(response.data);
                if (response.data.role === 'ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50 relative overflow-hidden pt-32">
            {/* Left Side - Modern Illustration & Branding */}
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
                        alt="Secure Access"
                        className="w-full h-auto mb-8 drop-shadow-2xl"
                        style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-4xl font-serif font-bold text-[#c5a059] mb-4">Secure Access</h2>
                        <p className="text-green-100/80 text-lg leading-relaxed">
                            Your gateway to a transparent and accountable civic grievance system.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
                {/* Mobile Background Elements */}
                <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-50 to-white -z-10"></div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md w-full bg-white md:bg-transparent md:p-0 p-8 rounded-2xl md:rounded-none shadow-xl md:shadow-none"
                >
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck className="w-8 h-8 text-[#1a472a]" />
                            <span className="text-sm font-bold tracking-widest text-[#c5a059] uppercase">Civil Grievance</span>
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                            {isResetting ? 'Reset Password' : 'Welcome Back'}
                        </h2>
                        <p className="text-gray-500">
                            {isResetting
                                ? 'Enter your email to receive reset instructions.'
                                : 'Please enter your details to sign in.'}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {isResetting ? (
                            <motion.form
                                key="reset-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                                onSubmit={handleResetSubmit}
                            >
                                {resetStatus === 'success' ? (
                                    <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                            <Mail size={24} />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">Check your email</h3>
                                        <p className="text-sm opacity-80 mb-6">We've sent password reset instructions to {resetEmail}.</p>
                                        <button
                                            type="button"
                                            onClick={() => setIsResetting(false)}
                                            className="text-green-800 hover:text-green-900 font-semibold underline"
                                        >
                                            Back to Login
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 block">Email Address</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1a472a] transition-colors" />
                                                <input
                                                    type="email"
                                                    value={resetEmail}
                                                    onChange={(e) => setResetEmail(e.target.value)}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a472a]/20 focus:border-[#1a472a] transition-all"
                                                    placeholder="Enter your registered email"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsResetting(false)}
                                                className="w-full py-4 text-gray-600 font-semibold hover:text-gray-900 transition-colors"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-[#1a472a] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#1a472a]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                                            >
                                                {isLoading ? 'Sending...' : 'Send Link'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.form>
                        ) : (
                            <motion.form
                                key="login-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                                onSubmit={handleSubmit}
                            >
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

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-gray-700 block">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1a472a] transition-colors" />
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                aria-label="Email Address"
                                                autoComplete="email"
                                                onChange={handleChange}
                                                className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a472a]/20 transition-all ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1a472a]'}`}
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        {formErrors.email && <p className="text-xs text-red-500 mt-1 ml-1">{formErrors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="password" className="text-sm font-semibold text-gray-700 block">Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1a472a] transition-colors" />
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                required
                                                aria-label="Password"
                                                autoComplete="current-password"
                                                onChange={handleChange}
                                                className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a472a]/20 transition-all ${formErrors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1a472a]'}`}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {formErrors.password && <p className="text-xs text-red-500 mt-1 ml-1">{formErrors.password}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded text-[#1a472a] focus:ring-[#1a472a] border-gray-300" />
                                        <span className="text-gray-600 group-hover:text-[#1a472a] transition-colors">Remember me</span>
                                        <div className="group relative">
                                            <HelpCircle size={14} className="text-gray-400" />
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                                Keeps you logged in for 30 days. Don't check this on public devices.
                                            </div>
                                        </div>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setIsResetting(true)}
                                        className="font-medium text-[#1a472a] hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#1a472a] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#1a472a]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Signing In...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>

                                <div className="text-center mt-8 text-gray-500">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="font-bold text-[#1a472a] hover:text-[#c5a059] transition-colors">
                                        Create an account
                                    </Link>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
