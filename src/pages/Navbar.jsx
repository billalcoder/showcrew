import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

export function Navbar() {
    const { products, loading , cart } = useProducts();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    if (loading) {
        return (
            <nav className="flex justify-center items-center py-4 text-xl">
                Loading...
            </nav>
        );
    }

    // Extract unique categories
    const categories = [...new Set(products.map(p => p.category))];

    // Get brands for a category
    const getBrands = (category) => {
        return [...new Set(products.filter(p => p.category === category).map(p => p.brand))];
    };

    return (

        <div className="shadow-md bg-white fixed top-0 left-0 w-full z-50">
            {/* TOP NAVBAR */}
            <nav className="flex justify-between items-center px-4 py-3 lg:mx-15 md:mx-15 text-sm">
                {/* Hamburger for mobile */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <i className="fa-solid fa-bars"></i>
                </button>

                {/* Logo */}
                <Link to={"https://showcrew.netlify.app"}><div className="logo md:text-2xl font-bold tracking-wider sm:text-lg">SHOECREW</div></Link>

                {/* Right - Login/Cart */}
                <div className="md:text-2xl sm:text-lg flex items-center gap-4">
                    <Link to="/login"><span className="cursor-pointer hover:text-blue-500">LOGIN</span></Link>
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

            {/* CATEGORY MENU (Always below navbar on desktop) */}
            <div className="bg-gray-50 border-t border-gray-200 relative">
                <ul className="hidden justify-center md:flex gap-6 px-4 py-2 text-lg">
                    {categories.map((cat, idx) => (
                        <Link to={`brand/${cat}`} state={cat}>
                            <li
                                key={idx}
                                className="relative cursor-pointer capitalize hover:text-blue-500 transition-colors"
                                onMouseEnter={() => setHoveredCategory(cat)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                {cat}

                                {/* BRAND DROPDOWN */}
                                {hoveredCategory === cat && (
                                    <ul className="absolute left-0 top-full mt-1 bg-white shadow-lg border rounded p-2 w-48 z-50">
                                        {getBrands(cat).map((brand, i) => (
                                            <Link to={`category/${brand}`} state={{ brand: brand, category: cat.category }}>
                                                <li
                                                    key={i}
                                                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer capitalize"
                                                >
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

                {/* Mobile Categories */}
                {isOpen && (
                    <div className="md:hidden px-4 py-2 bg-white shadow-lg">
                        <ul className="flex flex-col gap-4">
                            {categories.map((cat, idx) => (
                                <li key={idx} className="capitalize cursor-pointer">
                                    {cat}
                                </li>
                            ))}
                            <li>LOGIN</li>
                            <li>CART (0)</li>
                        </ul>
                    </div>
                )}
            </div>

        </div>
    );
}
