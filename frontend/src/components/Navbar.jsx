import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShieldCheck, LogOut, Menu, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    const isLandingPage = location.pathname === '/';
    // Login/Register pages also look better with fixed/transparent nav usually, but let's stick to Dashboard request.
    // Actually, usually only Landing pages need the transparent overlay effect. 
    // Let's treat Landing as special. Ideally Login/Register too if they have full BG images.
    // Based on user request "dashboard should start from navbar", we definitely want sticky for dashboard.

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkClass = ({ isActive }) =>
        `font-medium transition-colors relative ${isActive ? 'text-green-800 font-semibold' : 'text-gray-600 hover:text-green-900'}`;

    const activeIndicator = (
        <motion.span
            layoutId="underline"
            className="absolute left-0 top-full block h-0.5 w-full bg-green-800 mt-1"
        />
    );

    // Dynamic classes based on route
    const navbarClasses = isLandingPage || location.pathname === '/login' || location.pathname === '/register'
        ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3 px-8' : 'bg-transparent py-5 px-8'}`
        : 'sticky top-0 z-50 bg-white shadow-sm py-3 px-8'; // Dashboard & others get solid sticky nav

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={navbarClasses}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-green-800 p-2 rounded-lg text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <ShieldCheck size={28} />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-serif text-green-900 tracking-wide font-bold leading-none">
                            Civil<span className="text-yellow-600">Grievance</span>
                        </h1>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">Official Portal</span>
                    </div>
                </Link>

                <div className="flex items-center gap-8">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/" className={navLinkClass}>
                            {({ isActive }) => (
                                <>
                                    Home
                                    {isActive && activeIndicator}
                                </>
                            )}
                        </NavLink>
                        <NavLink to="/how-it-works" className={navLinkClass}>
                            {({ isActive }) => (
                                <>
                                    How It Works
                                    {isActive && activeIndicator}
                                </>
                            )}
                        </NavLink>
                    </div>

                    <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

                    <div className="flex items-center gap-4">
                        {!user ? (
                            <>
                                <Link to="/login" className="px-5 py-2 text-green-800 font-semibold hover:bg-green-50 rounded-lg transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="px-5 py-2 bg-green-800 text-white rounded-lg shadow-lg shadow-green-900/20 hover:bg-green-900 hover:-translate-y-0.5 transition-all font-semibold">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-right">
                                    <div className="hidden md:block">
                                        <p className="text-sm font-bold text-gray-900">{user.fullName || 'Citizen'}</p>
                                        <p className="text-xs text-gray-500 font-medium">{user.role === 'ADMIN' ? 'Administrator' : 'Verified User'}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-800 border-2 border-green-200">
                                        <User size={20} />
                                    </div>
                                </div>

                                {user.role === 'ADMIN' ? (
                                    <Link to="/admin" className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold hover:bg-green-200 transition-colors">
                                        Admin Panel
                                    </Link>
                                ) : (
                                    <Link to="/dashboard" className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold hover:bg-green-200 transition-colors">
                                        Dashboard
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
