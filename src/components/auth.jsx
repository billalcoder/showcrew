import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { State, City } from "country-state-city";

export function AuthForm({ mode = "signup", onSubmit }) {
  const url = "https://showcrew-backend.onrender.com"
  const googleBtn = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const emailValue = watch("email"); // watch email input

  // Load all Indian states
  useEffect(() => {
    const allStates = State.getStatesOfCountry("IN");
    setStates(allStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const stateCities = City.getCitiesOfState("IN", selectedState);
      setCities(stateCities);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  // Submit signup/signin
  const submitHandler = (data) => {
    if (mode === "signup" && !otpVerified) {
      alert("⚠️ Please verify OTP before registering!");
      return;
    }
    onSubmit(data, mode);
  };

  // 🔹 Send OTP API call
  const handleSendOtp = async () => {
    try {
      if (!emailValue) return alert("Enter your email first!");

      const res = await fetch(`${url}/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setOtpSent(true);
      alert("✅ OTP sent to your email!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // 🔹 Verify OTP API call
  const handleVerifyOtp = async () => {
    try {
      const res = await fetch(`${url}/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, otp: otpValue }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setOtpVerified(true);
      alert("🎉 OTP Verified Successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-20">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {mode === "signup" ? "Create Account" : "Sign In"}
        </h2>

        {/* SIGNUP EXTRA FIELDS */}
        {mode === "signup" && (
          <>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: "Full name is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Street Address"
                {...register("street", { required: "Street is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street.message}</p>
              )}
            </div>

            {/* State Select */}
            <div>
              <select
                {...register("state", { required: "State is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>

            {/* City Select */}
            <div>
              <select
                {...register("city", { required: "City is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="ZIP Code"
                {...register("zip", { required: "ZIP Code is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.zip && (
                <p className="text-red-500 text-sm">{errors.zip.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phone", { required: "Phone number is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </>
        )}

        {/* Email + Send OTP button */}
        <div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
              })}
              className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
            {mode === "signup" && !otpVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-blue-500 text-white px-3 rounded-lg"
              >
                {otpSent ? "Resend OTP" : "Send OTP"}
              </button>
            )}
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* OTP Input Field (only after send) */}
        {otpSent && !otpVerified && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="bg-green-500 text-white px-3 rounded-lg"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Password (for both signup/signin) */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Register button only if OTP verified */}
        {mode === "signup" ? (
          otpVerified && (
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition duration-200"
            >
              Sign Up
            </button>
          )
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition duration-200"
          >
            Sign In
          </button>
        )}

        {/* Toggle links */}
        {mode === "signup" ? (
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        ) : (
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
