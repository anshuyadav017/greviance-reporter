import React from 'react';

const CookiePolicy = () => {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a472a] mb-8">Cookie Policy</h1>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-sm text-gray-500 mb-6">Last Updated: December 2024</p>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">1. What are Cookies?</h2>
                        <p>
                            Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your user experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">2. How We Use Cookies</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g., login sessions).</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site so we can improve it.</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings like language or region.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">3. Managing Cookies</h2>
                        <p>
                            You can control or delete cookies through your browser settings. However, disabling cookies may affect the functionality of this website.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
