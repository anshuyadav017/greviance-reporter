import React from 'react';

const Accessibility = () => {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a472a] mb-8">Accessibility Statement</h1>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-sm text-gray-500 mb-6">Commitment to Digital Inclusion</p>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">Our Goal</h2>
                        <p>
                            CivilGrievance is committed to ensuring that our platform is accessible to all individuals, including those with disabilities. We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">Key Features</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Keyboard Navigation:</strong> All interactive elements are accessible via keyboard.</li>
                            <li><strong>Screen Reader Compatibility:</strong> We use semantic HTML to ensure compatibility with screen readers.</li>
                            <li><strong>Color Contrast:</strong> We maintain high contrast ratios for text readability.</li>
                            <li><strong>Alt Text:</strong> Images include descriptive alt text.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1a472a] mb-3">Feedback</h2>
                        <p>
                            If you encounter any accessibility barriers on our site, please contact us immediately at <a href="mailto:access@civilgrievance.gov" className="text-[#1a472a] font-bold underline">sachinraosahab7@gmail.com</a>. We are dedicated to continuous improvement.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Accessibility;
