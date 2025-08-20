import React from 'react'

export default function TermsAndConditions() {
    return (
        <div className="bg-gray-50 min-h-screen py-10 px-5 sm:px-10">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
                    Terms and Conditions
                </h1>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <p>
                            Welcome to Shoecrew. These Terms and Conditions govern your access to and use of our website,
                            <a href="https://shoecrew.in/" className="text-blue-600 underline"> https://shoecrew.in/</a>,
                            and any products or services offered through the Site. By accessing or using the Site, you agree to be bound by these Terms.
                            If you do not agree with these Terms, please do not use the Site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Use of the Site</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Eligibility:</strong> You must be at least 18 years old to use the Site. By using the Site, you represent and warrant that you meet this age requirement.</li>
                            <li><strong>Account Registration:</strong> You may be required to create an account to access certain features or make purchases. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</li>
                            <li><strong>Prohibited Activities:</strong> You agree not to engage in any activities that may harm the Site, its users, or its content. This includes but is not limited to hacking, spamming, distributing malware, and violating any applicable laws.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Product Information and Availability</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Product Descriptions:</strong> We strive to provide accurate and up-to-date information about our products. However, we do not warrant that product descriptions, images, or other content on the Site are accurate, complete, or error-free.</li>
                            <li><strong>Pricing:</strong> Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product at any time.</li>
                            <li><strong>Availability:</strong> All products are subject to availability. We cannot guarantee that any item will be in stock at the time of your order.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Orders and Payments</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Order Acceptance:</strong> Your order constitutes an offer to purchase products from us. We reserve the right to accept or reject any order for any reason.</li>
                            <li><strong>Payment:</strong> You agree to provide accurate and complete payment information. We accept various forms of payment as indicated on the Site.</li>
                            <li><strong>Shipping:</strong> Shipping costs and delivery times are provided at checkout. We are not responsible for delays caused by shipping carriers or events beyond our control.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Returns and Refunds</h2>
                        <p>
                            <strong>Return Policy:</strong> Our return and refund policy is outlined on the Site. Please review it carefully before making a purchase.
                        </p>
                        <p>
                            <strong>Refunds:</strong> Refunds are processed according to our return policy. Shipping costs are non-refundable unless the return is due to our error.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Ownership:</strong> All content on the Site, including text, images, logos, and trademarks, is the property of THE STYLE HUB or its licensors and is protected by intellectual property laws.</li>
                            <li><strong>Limited License:</strong> You are granted a limited, non-exclusive, non-transferable license to access and use the Site for personal, non-commercial purposes. You may not copy, modify, distribute, or create derivative works based on the Site’s content without our express written permission.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Disclaimer:</strong> The Site and its content are provided “as is” without any warranties, express or implied. We do not guarantee that the Site will be error-free or available at all times.</li>
                            <li><strong>Limitation of Liability:</strong> To the fullest extent permitted by law, shoecrew shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the Site or any products purchased through the Site.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Indemnification</h2>
                        <p>
                            You agree to indemnify and hold harmless shoecrew, its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, and expenses arising out of your use of the Site or violation of these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of [Insert Jurisdiction], without regard to its conflict of law principles.
                            Any disputes arising under these Terms shall be resolved exclusively in the courts located in [Insert Jurisdiction].
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to These Terms</h2>
                        <p>
                            We reserve the right to update or modify these Terms at any time. Any changes will be posted on this page with an updated effective date.
                            Your continued use of the Site after any changes constitutes your acceptance of the new Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at:
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
