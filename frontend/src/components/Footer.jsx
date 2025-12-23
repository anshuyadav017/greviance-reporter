import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1a472a] text-white pt-16 pb-8">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                                <ShieldCheck size={24} className="text-[#c5a059]" />
                            </div>
                            <span className="text-xl font-serif font-bold tracking-wide">
                                Civil<span className="text-[#c5a059]">Grievance</span>
                            </span>
                        </Link>
                        <p className="text-green-100/70 text-sm leading-relaxed">
                            Empowering citizens to voice their concerns and building a transparent, accountable governance system together.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-[#c5a059]">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-green-100/70 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-green-100/70 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/how-it-works" className="text-green-100/70 hover:text-white transition-colors">How It Works</Link></li>
                            <li><Link to="/contact" className="text-green-100/70 hover:text-white transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-[#c5a059]">Legal</h4>
                        <ul className="space-y-3">
                            <li><Link to="/privacy" className="text-green-100/70 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-green-100/70 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/cookie-policy" className="text-green-100/70 hover:text-white transition-colors">Cookie Policy</Link></li>
                            <li><Link to="/accessibility" className="text-green-100/70 hover:text-white transition-colors">Accessibility</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-[#c5a059]">Connect</h4>
                        <div className="flex gap-4 mb-6">
                            <a href="https://github.com/Sachin23991" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-[#c5a059] hover:text-[#1a472a] transition-all">
                                <Github size={20} />
                            </a>
                            <a href="https://x.com/MandhiyaRao" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-[#c5a059] hover:text-[#1a472a] transition-all">
                                <Twitter size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/sachin6/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-[#c5a059] hover:text-[#1a472a] transition-all">
                                <Linkedin size={20} />
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-green-100/70 text-sm">
                            <Mail size={16} />
                            <a href="mailto:sachinraosahab7@gmail.com" className="hover:text-white transition-colors">sachinraosahab7@gmail.com</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-green-100/50 text-sm">
                        © 2024 CivilGrievance Portal. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-green-100/50">
                        <span>Version 1.0.0</span>
                        <span>Made with ❤️ for the People</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
