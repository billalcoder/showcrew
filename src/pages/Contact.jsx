import React from "react";

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Contact Us
        </h1>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Trade name:</span> Shoecrew
          </p>
          <p>
            <span className="font-semibold">Phone number:</span>{" "}
            <a href="tel:+919016401101" className="text-blue-600 hover:underline">
              +91 9016401101
            </a>
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:theshoecrew999@gmail.com"
              className="text-blue-600 hover:underline"
            >
              theshoecrew999@gmail.com
            </a>
          </p>
          <p>
            <span className="font-semibold">Address:</span> Surat, Gujarat
          </p>
        </div>
      </div>
    </div>
  );
}
