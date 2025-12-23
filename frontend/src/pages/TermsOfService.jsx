import React from 'react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a472a] mb-8">Terms of Service</h1>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-sm text-gray-500 mb-6">Last Updated: December 2024</p>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the CivilGrievance portal, you agree to be bound by these Terms of Service. If you do not agree, strictly do not use this portal.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">2. User Conduct</h2>
                        <p>
                            You agree not to use the portal for any unlawful purpose. You must not submit false or misleading information. Abusive language or harassment of officials through this platform is strictly prohibited.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">3. Limitation of Liability</h2>
                        <p>
                            While we strive to resolve all grievances, CivilGrievance is a facilitator and does not guarantee the outcome of any complaint. The respective government departments are responsible for the final resolution.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">4. Account Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your account if you violate these terms or misuse the platform.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
