import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a472a] mb-8">Privacy Policy</h1>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-sm text-gray-500 mb-6">Last Updated: December 2024</p>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">1. Information Collection</h2>
                        <p>
                            We collect information necessary to process your grievances effectively. This includes your name, contact details, and the specifics of the grievance you file. We may also collect metadata such as IP addresses for security purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">2. Use of Information</h2>
                        <p>
                            Your data is used solely for the purpose of resolving your complaints. It may be shared with the relevant government departments responsible for addressing the specific issue. We do not sell your data to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">3. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">4. Your Rights</h2>
                        <p>
                            You have the right to access, correct, or request deletion of your personal data. Please contact our support team for any such requests.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
