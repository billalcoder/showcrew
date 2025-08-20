import React, { Component } from "react";

export default function PrivacyPolicy() {
  
    return (
      <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed mt-30">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="mb-4">
          Welcome to <strong>ShoeCrew</strong>. Your privacy is important to us,
          and we are committed to protecting the personal information you share
          with us. This Privacy Policy explains how we collect, use, and
          safeguard your information when you visit our website,{" "}
          <a
            href="https://shoecrew.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://shoecrew.in/
          </a>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-2">We may collect the following types of information:</p>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, billing and shipping address, payment details, and any other
            information you voluntarily provide.
          </li>
          <li>
            <strong>Non-Personal Information:</strong> IP address, browser type,
            operating system, referring URLs, and other technical information
            collected through cookies and other tracking technologies.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Process and fulfill your orders.</li>
          <li>
            Communicate with you regarding your orders, inquiries, and
            promotional offers.
          </li>
          <li>Improve our website, products, and services.</li>
          <li>Comply with legal obligations and prevent fraudulent activities.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
        <p className="mb-2">
          We do not sell, trade, or rent your personal information to third
          parties. We may share your information with:
        </p>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>
            <strong>Service Providers:</strong> Third-party companies that assist
            us in operating our website, conducting business, or servicing you.
          </li>
          <li>
            <strong>Legal Obligations:</strong> If required by law or in response
            to legal processes, we may disclose your information.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to enhance your
          browsing experience. You can choose to disable cookies through your
          browser settings, but doing so may affect the functionality of the Site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
        <p className="mb-4">
          We implement security measures to protect your personal information
          from unauthorized access, alteration, or disclosure. However, no method
          of transmission over the internet is completely secure, and we cannot
          guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Access, correct, or delete your personal information.</li>
          <li>Withdraw consent for us to process your data.</li>
          <li>
            Lodge a complaint with a data protection authority if you believe your
            rights have been violated.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Third-Party Links</h2>
        <p className="mb-4">
          Our Site may contain links to third-party websites. We are not
          responsible for the privacy practices of those sites. We encourage you
          to review their privacy policies before providing any personal
          information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated effective date.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please
          contact us at:{" "}
          <a
            href="mailto:contact@shoecrew.in"
            className="text-blue-600 underline"
          >
            contact@shoecrew.in
          </a>
        </p>
      </div>
    );
}
