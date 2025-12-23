import React, { useRef, useState, useEffect, useContext } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, ArrowRight, TrendingUp, Users, Building, Shield, Zap, Award, BarChart3, FileText, MousePointer2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroIllustration from '../assets/hero_illustration.png';
import ImmersiveBackground from '../components/ImmersiveBackground';
import { AuthContext } from '../context/AuthContext';

// --- Utility Components ---

const FadeInUp = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

const SplitText = ({ children, className = "", delay = 0 }) => {
    return (
        <span className={`${className} inline-block whitespace-nowrap`}>
            {children.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: delay + i * 0.03, ease: "easeOut" }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
};

const ParallaxText = ({ children, baseVelocity = 100 }) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useSpring(scrollY, { stiffness: 400, damping: 90 });
    const x = useTransform(scrollY, [0, 1000], [0, baseVelocity]);

    return (
        <div className="overflow-hidden flex flex-nowrap whitespace-nowrap gap-8 py-4 opacity-10 select-none pointer-events-none">
            <motion.div style={{ x }} className="flex gap-8 text-8xl font-black uppercase text-transparent stroke-text">
                {Array(4).fill(children).map((text, i) => (
                    <span key={i} className="tracking-tighter" style={{ WebkitTextStroke: "2px #1a472a" }}>{text}</span>
                ))}
            </motion.div>
        </div>
    );
};

// Spotlight Card Component
const SpotlightCard = ({ children, className = "" }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-gray-200 bg-white overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(26, 71, 42, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};

// Button with Hover Glow
const GlowingButton = ({ children, primary = false, ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative overflow-hidden px-8 py-4 rounded-full font-medium text-lg transition-all ${primary
                ? 'bg-[#1a472a] text-white shadow-xl shadow-green-900/20'
                : 'border-2 border-[#1a472a] bg-transparent text-[#1a472a] hover:bg-[#1a472a] hover:text-white'
                }`}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.button>
    );
};

// --- Modal Component for Features ---
const FeatureModal = ({ feature, onClose }) => {
    if (!feature) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 p-2 rounded-full transition-colors"><X size={20} /></button>
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                    {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    This feature allows citizens to experience transparency like never before. {feature.desc}
                    <br /><br />
                    <strong>Why it matters:</strong> By choosing our platform, you ensure that every action is recorded, every delay is accounted for, and every resolution is verified.
                </p>
                <button onClick={onClose} className="w-full py-3 bg-[#1a472a] text-white rounded-xl font-bold hover:bg-green-900 transition-colors">
                    Got it
                </button>
            </motion.div>
        </div>
    );
};

// --- Main Page Component ---

const LandingPage = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const { user } = useContext(AuthContext);
    const [selectedFeature, setSelectedFeature] = useState(null);

    const actionLink = user ? "/dashboard" : "/register";

    return (
        <div className="text-gray-900 overflow-hidden font-sans selection:bg-green-200 relative pt-32">
            {/* Scroll Progress */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-[#c5a059] origin-left z-50"
                style={{ scaleX }}
            />

            {/* Immersive 3D Background - Fixed behind everything */}
            <ImmersiveBackground />

            {/* Feature Modal */}
            <AnimatePresence>
                {selectedFeature && <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />}
            </AnimatePresence>

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="space-y-8 z-10 order-2 md:order-1 relative">
                        <FadeInUp delay={0.2}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-green-100 shadow-sm cursor-default"
                            >
                                <span className="h-2 w-2 rounded-full bg-[#1a472a] animate-pulse" />
                                <span className="text-[#1a472a] font-bold tracking-widest text-xs uppercase">Official Grievance Portal</span>
                            </motion.div>
                        </FadeInUp>

                        <div className="z-20">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] tracking-tight text-gray-900">
                                <SplitText delay={0.2}>Voice of</SplitText> <br />
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#1a472a] to-[#2e7d32]">
                                    <SplitText delay={0.5}>Justice.</SplitText>
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#c5a059] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1, delay: 1 }}
                                            d="M0 5 Q 50 10 100 5"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            fill="none"
                                        />
                                    </svg>
                                </span>
                            </h1>
                        </div>

                        <FadeInUp delay={0.8}>
                            <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-light backdrop-blur-sm">
                                Empowering citizens with a transparent, efficient, and accountable platform.
                                Your grievances, heard and resolved.
                            </p>
                        </FadeInUp>

                        <FadeInUp delay={1.0} className="flex flex-wrap gap-4">
                            <Link to={actionLink}>
                                <GlowingButton primary>
                                    File a Complaint
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </GlowingButton>
                            </Link>
                            <Link to="/how-it-works">
                                <GlowingButton>
                                    How it works
                                </GlowingButton>
                            </Link>
                        </FadeInUp>

                        {/* Mini Stats */}
                        <FadeInUp delay={1.2} className="pt-8 border-t border-gray-200/60 flex items-center gap-12">
                            {[
                                { val: "12k+", label: "Resolved", date: "Year 2024" },
                                { val: "98%", label: "Satisfaction", date: "User Feedback" }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="cursor-pointer group"
                                >
                                    <h4 className="text-3xl font-bold text-[#1a472a]">{stat.val}</h4>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-800 font-semibold uppercase tracking-wider">{stat.label}</span>
                                        <span className="text-xs text-gray-500">{stat.date}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </FadeInUp>
                    </div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="relative z-10 flex justify-center md:justify-end order-1 md:order-2"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02, rotate: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative w-full max-w-sm md:max-w-lg cursor-pointer"
                        >
                            {/* Accent Ring */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-[#c5a059]/30 rounded-full animate-spin-slow pointer-events-none" style={{ animationDuration: '30s' }}></div>

                            <img
                                src={heroIllustration}
                                alt="Civic Grievance Illustration"
                                className="w-full h-auto object-contain drop-shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- MARQUEE SEPARATOR --- */}
            <div className="relative py-12 bg-[#1a472a] text-[#c5a059] flex items-center overflow-hidden -rotate-1 shadow-2xl z-20 hover:bg-[#153a22] transition-colors transition-duration-500">
                <ParallaxText baseVelocity={-5}>TRANSPARENCY • ACCOUNTABILITY • SPEED • JUSTICE • </ParallaxText>
            </div>

            {/* --- FEATURES SECTION --- */}
            <section className="py-24 md:py-32 relative z-10 bg-white/60 backdrop-blur-md">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center mb-20">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#c5a059] font-bold tracking-widest uppercase mb-4 block"
                        >
                            Why Choose Us
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-6xl font-serif font-bold text-[#1a472a]"
                        >
                            Redefining Public Service.
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Real-time Tracking", icon: <Clock className="w-8 h-8" />, desc: "Monitor your complaint status every step of the way with live updates.", bg: "bg-blue-50 text-blue-700" },
                            { title: "Direct Action", icon: <Zap className="w-8 h-8" />, desc: "Complaints are routed directly to the responsible field officer.", bg: "bg-yellow-50 text-yellow-700" },
                            { title: "Public Analytics", icon: <BarChart3 className="w-8 h-8" />, desc: "View heatmaps and statistics of grievances in your area.", bg: "bg-purple-50 text-purple-700" }
                        ].map((item, index) => (
                            <div key={index} onClick={() => setSelectedFeature(item)} className="cursor-pointer">
                                <SpotlightCard className="rounded-3xl h-full shadow-lg border-gray-100">
                                    <motion.div
                                        className="p-10 h-full flex flex-col items-start gap-6 relative z-10 group"
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className={`p-4 rounded-2xl ${item.bg} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#1a472a] transition-colors">{item.title}</h3>
                                        <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>

                                        <div className="mt-auto pt-4 flex items-center gap-2 text-[#1a472a] font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                                            Learn more <ArrowRight size={16} />
                                        </div>
                                    </motion.div>
                                </SpotlightCard>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CATEGORIES PARALLAX SECTION --- */}
            <section className="py-24 md:py-32 bg-[#1a472a]/95 text-white relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-serif font-bold mb-6">Departments</h2>
                        <p className="text-green-200 text-xl max-w-2xl mx-auto">We cover every aspect of civic life. Select your concern area to know more.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { id: "sanitation", name: "Sanitation", icon: Users, stats: "1.2k complaints" },
                            { id: "roadworks", name: "Roadworks", icon: Building, stats: "850+ in progress" },
                            { id: "lighting", name: "Lighting", icon: Zap, stats: "98% resolved" },
                            { id: "water-supply", name: "Water Supply", icon: CheckCircle, stats: "24h avg time" },
                            { id: "transport", name: "Transport", icon: Clock, stats: "450 active" },
                            { id: "health", name: "Health", icon: AlertCircle, stats: "Priority High" },
                            { id: "law-order", name: "Law & Order", icon: Shield, stats: "Direct Line" },
                            { id: "education", name: "Education", icon: Award, stats: "New Dept" }
                        ].map((cat, i) => (
                            <Link to={`/department/${cat.id}`} key={i}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgba(255,255,255,0.15)" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/50 h-full"
                                >
                                    <div className="p-3 bg-white/10 rounded-full group-hover:bg-[#c5a059] transition-colors duration-300">
                                        <cat.icon className="w-8 h-8 text-[#c5a059] group-hover:text-[#1a472a] transition-colors" />
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold tracking-wide text-lg block">{cat.name}</span>
                                        <span className="text-xs text-green-300 uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-1 block">
                                            {cat.stats}
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-24 md:py-32 relative overflow-hidden bg-transparent">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#c5a059] rounded-[3rem] p-10 md:p-24 relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-black/5 pattern-dots opacity-20"></div>
                        {/* Hover gradient reveal */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                        <motion.div
                            style={{ y: useTransform(scrollYProgress, [0.6, 1], [0, -50]) }}
                            className="relative z-10"
                        >
                            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1a472a] mb-8">Ready to make a change?</h2>
                            <p className="text-[#1a472a] text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-medium">Join thousands of citizens building a better tomorrow, one complaint at a time.</p>
                            <Link to={actionLink}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#1a472a] text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-green-900/30 transition-all duration-300 flex items-center gap-3 mx-auto"
                                >
                                    Get Started Now
                                    <ArrowRight />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
