import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-48 h-6 rounded-md shimmer"></div>
    </div>
  );
}