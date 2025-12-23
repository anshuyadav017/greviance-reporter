import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Target, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen pt-20 pb-16 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a472a] mb-4">About CivilGrievance</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Building a bridge between citizens and administration through transparency and technology.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-[#1a472a]">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We believe that every citizen deserves a voice. Our platform was created to streamline the public grievance redressal process, making it faster, transparent, and accountable. By leveraging modern technology, we ensure that your concerns reach the right authorities instantly.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Gone are the days of long queues and lost paperwork. CivilGrievance brings the administration to your doorstep.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Team Collaboration"
                            className="w-full h-64 object-cover rounded-xl mb-6"
                        />
                        <div className="flex gap-4">
                            <div className="flex-1 text-center p-4 bg-green-50 rounded-xl">
                                <h3 className="font-bold text-2xl text-[#1a472a]">12k+</h3>
                                <p className="text-sm text-gray-600">Issues Resolved</p>
                            </div>
                            <div className="flex-1 text-center p-4 bg-yellow-50 rounded-xl">
                                <h3 className="font-bold text-2xl text-yellow-700">98%</h3>
                                <p className="text-sm text-gray-600">Satisfaction</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Values Grid */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold text-[#1a472a] text-center mb-12">Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Integrity", desc: "Unwavering commitment to ethical standards and honesty." },
                            { icon: Target, title: "Efficiency", desc: "Resolving issues with speed and precision." },
                            { icon: Users, title: "Inclusivity", desc: "A platform for everyone, regardless of background." },
                            { icon: Award, title: "Excellence", desc: "Striving for the highest quality in public service." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#1a472a] hover:shadow-xl transition-shadow"
                            >
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-[#1a472a] mb-4">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600 font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
