// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, isAuthenticated }) {
    const url = "https://showcrew-backend.onrender.com"
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${url}/user/profile`, {
                    method: "GET",
                    credentials: "include", // 🔑 send cookies/session
                });
                const data = await res.json();

                if (res.ok && data) {
                    setUser(data); // directly user object
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setUser(null);
            }
        };
        fetchUser();
    }, []);
    if (!isAuthenticated) {
        // if not logged in → redirect to signin
        return <Navigate to="/" replace />;
    }

    if (user?.role[0] !== "admin") {
        // if logged in but not admin → show error
        return <h1 className="text-red-600 text-center mt-10">⛔ Access Denied: Admins Only</h1>;
    }

    // if admin → allow access
    return children;
}

