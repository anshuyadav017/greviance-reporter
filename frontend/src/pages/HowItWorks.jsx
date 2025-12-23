import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileText, Activity, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorkflowBackground from '../components/WorkflowBackground';

const StepCard = ({ number, title, desc, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -10 }}
        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/50 relative overflow-hidden group"
    >
        <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-8xl font-black text-[#1a472a] transform translate-x-4 -translate-y-4">
            {number}
        </div>

        <div className="relative z-10">
            <div className="w-16 h-16 bg-[#1a472a] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-900/20 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8 text-[#c5a059]" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
        </div>
    </motion.div>
);

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-[#f8f9fa] relative overflow-hidden font-sans pt-20">
            {/* 3D Background */}
            <WorkflowBackground />

            {/* Radial Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-white/50 to-white/90 pointer-events-none -z-10" />

            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-green-100/50 border border-green-200 text-[#1a472a] font-bold tracking-widest text-sm uppercase"
                    >
                        Process Overview
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-6xl font-serif font-bold text-[#1a472a]"
                    >
                        From Problem to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-yellow-600">Resolution.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-600"
                    >
                        A simple, transparent 4-step journey to get your voice heard and issues fixed.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent -translate-y-1/2 -z-10" />

                    <StepCard
                        number="01"
                        title="Register"
                        desc="Create your secure account. Verify your identity to ensure a transparent reporting process."
                        icon={UserPlus}
                        delay={0.2}
                    />
                    <StepCard
                        number="02"
                        title="Raise Complaint"
                        desc="Fill out the detailed grievance form. Attach photos and choose the correct department."
                        icon={FileText}
                        delay={0.4}
                    />
                    <StepCard
                        number="03"
                        title="Processing"
                        desc="Your complaint is routed to the relevant officer. Track real-time status updates."
                        icon={Activity}
                        delay={0.6}
                    />
                    <StepCard
                        number="04"
                        title="Resolution"
                        desc="The issue is resolved and verified. You receive a final report and satisfaction survey."
                        icon={CheckCircle}
                        delay={0.8}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.0 }}
                    className="mt-20 text-center"
                >
                    <div className="bg-[#1a472a] rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Ready to make a difference?</h2>
                        <Link to="/register">
                            <button className="bg-[#c5a059] text-[#1a472a] px-10 py-4 rounded-full text-lg font-bold hover:bg-white transition-colors duration-300 relative z-10 flex items-center gap-2 mx-auto">
                                Get Started Now <ArrowRight size={20} />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HowItWorks;
