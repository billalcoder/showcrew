import React from 'react'

export default function ReturnRefundPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5 sm:px-10 mt-30">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          Return & Refund Policy
        </h1>
        <p className="text-gray-600 text-center mb-10">
          At <span className="font-semibold">Shoecrew</span>, your satisfaction is our priority.  
          We’ve designed a simple and hassle-free return & refund process to make your shopping worry-free.
        </p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              🔹 Return Eligibility
            </h2>
            <p>
              You may return a product if it is{" "}
              <span className="font-medium">damaged, defective, or incorrect</span>.  
              To qualify for a return:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Product must be unused and in its original packaging.</li>
              <li>All tags must be intact.</li>
              <li>
                <span className="font-medium text-red-600">
                  An unboxing video is mandatory
                </span>{" "}
                for returns or exchanges. Without it, requests will not be accepted.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              ⏳ Return Period
            </h2>
            <p>
              You must initiate your return within{" "}
              <span className="font-medium">7 days</span> of receiving the product.  
              Requests beyond this period will not be accepted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              🔄 Exchange Option
            </h2>
            <p>
              If you’ve received a{" "}
              <span className="font-medium">damaged or defective</span> item, you can opt for an{" "}
              <span className="font-medium">exchange</span>.  
              Our support team will assist you to get a replacement quickly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              📌 Important Notes
            </h2>
            <p>
              This policy is subject to change without prior notice.  
              Please review it periodically for updates.
            </p>
          </section>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-700">
            Have questions? Reach out to us anytime at{" "}
            <a
              href="mailto:support@shoecrew.in"
              className="text-blue-600 font-medium hover:underline"
            >
              support@shoecrew.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

