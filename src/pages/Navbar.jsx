import { useState, useEffect, useRef } from "react";
import { useProducts } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // 👈 for animation

export function Navbar() {
    const url = "https://showcrew-backend.onrender.com";
    const { products, loading, cart } = useProducts();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const menuRef = useRef(null); // 👈 to detect outside clicks

    // ✅ Fetch user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${url}/user/profile`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();

                if (res.ok && data) {
                    setUser(data);
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

    // ✅ Logout
    const handleLogout = async () => {
        try {
            await fetch(`${url}/user/logout`, {
                method: "POST",
                credentials: "include"
            });
            setUser(null);
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    // ✅ Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    if (loading) {
        return (
            <nav className="flex justify-center items-center py-4 text-xl">
                Loading...
            </nav>
        );
    }

    // Categories + brands
    const categories = [...new Set(products.map(p => p.category))];
    const getBrands = (category) => {
        return [...new Set(products.filter(p => p.category === category).map(p => p.brand))];
    };

    return (
        <div className="shadow-md bg-white fixed top-0 left-0 w-full z-50">
            {/* TOP NAVBAR */}
            <nav className="flex justify-between items-center px-4 py-3 lg:mx-15 md:mx-15 text-sm">
                {/* Hamburger */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <i className="fa-solid fa-bars"></i>
                </button>

                {/* Logo */}
                <Link to={"/"}>
                    <div className="logo md:text-2xl font-bold tracking-wider sm:text-lg">
                        SHOECREW
                    </div>
                </Link>

                {/* Right Side */}
                <div className="md:text-lg sm:text-base flex items-center gap-4">
                    {user ? (
                        <>
                            {user.role[0] === "admin" ? (
                                <Link to="/admin/order" className="hidden sm:inline">SEE ORDERS</Link>
                            ) : (
                                <Link to="/user/order" className="hidden sm:inline">TRACK ORDERS</Link>
                            )}
                            <div onClick={handleLogout} className="cursor-pointer hover:text-red-500">LOGOUT</div>
                        </>
                    ) : (
                        <Link to="/signup">
                            <span className="cursor-pointer hover:text-blue-500">LOGIN</span>
                        </Link>
                    )}

                    <Link to="/cart">
                        <span className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                            CART/<span className="font-bold">
                                {cart.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                            <i className="fa-solid fa-bag-shopping"></i>
                        </span>
                    </Link>
                </div>
            </nav>

            {/* CATEGORY MENU */}
            <div className="bg-gray-50 border-t border-gray-200 relative">
                <ul className="hidden justify-center md:flex gap-6 px-4 py-2 text-lg">
                    {categories.map((cat, idx) => (
                        <Link to={`brand/${cat}`} state={cat} key={idx}>
                            <li
                                className="relative cursor-pointer capitalize hover:text-blue-500 transition-colors"
                                onMouseEnter={() => setHoveredCategory(cat)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                {cat}

                                {/* BRAND DROPDOWN */}
                                {hoveredCategory === cat && (
                                    <ul className="absolute left-0 top-full mt-1 bg-white shadow-lg border rounded p-2 w-48 z-50">
                                        {getBrands(cat).map((brand, i) => (
                                            <Link
                                                key={i}
                                                to={`category/${brand}`}
                                                state={{ brand, category: cat }}
                                            >
                                                <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer capitalize">
                                                    {brand}
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        </Link>
                    ))}
                </ul>

                {/* MOBILE MENU with animation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={menuRef}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden px-4 py-2 bg-white shadow-lg absolute w-full z-50"
                        >
                            <ul className="flex flex-col gap-4">
                                {categories.map((cat, idx) => (
                                    <li key={idx} className="capitalize cursor-pointer">
                                        <Link to={`brand/${cat}`} state={cat}>{cat}</Link>
                                    </li>
                                ))}

                                {user ? (
                                    <>
                                        {user.role[0] === "admin" ? (
                                            <li><Link to="/admin/order">SEE ORDERS</Link></li>
                                        ) : (
                                            <li><Link to="/user/order">TRACK ORDERS</Link></li>
                                        )}
                                        <li onClick={handleLogout} className="cursor-pointer">LOGOUT</li>
                                    </>
                                ) : (
                                    <li><Link to="/signup">LOGIN</Link></li>
                                )}

                                <li>
                                    <Link to="/cart">
                                        CART ({cart.reduce((t, i) => t + i.quantity, 0)})
                                    </Link>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
