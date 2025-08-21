import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function Product() {
    const { state } = useLocation();
    const { products, loading, setCart } = useProducts();
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    const [selectedSize, setSelectedSize] = React.useState("");
    console.log(state);
    async function addToCart(product) {
        try {
            const res = await fetch("https://showcrew-backend.onrender.com/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    product: {
                        ...product,
                        ...(product.category.toLowerCase() === "shoes" && { size: selectedSize }) // send size if shoe
                    },
                    quantity: 1,
                    size: selectedSize
                }),
            });
            const data = await res.json();
            if (data.cart) setCart(data.cart);
        } catch (err) {
            console.error("Failed to add item", err);
        }
    }

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!state) return <p className="text-center py-10">No product found.</p>;

    const product = state;
    const related = products.filter(
        (p) =>
            p.category?.toLowerCase() === product.category?.toLowerCase() &&
            p.id !== product.id
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-50">
            {/* Top section */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Image carousel */}
                <div className="max-w-full overflow-hidden">
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        modules={[Navigation, Thumbs]}
                        loop={true}
                        className="rounded-lg overflow-hidden"
                    >
                        {product.images?.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <img
                                    src={img}
                                    alt={product.title}
                                    className="w-full h-[400px] object-scale-down"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Thumbnails */}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        watchSlidesProgress
                        className="mt-2"
                    >
                        {product.images?.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <img
                                    src={img}
                                    alt={product.title}
                                    className="w-full max-h-[80px] object-contain rounded border cursor-pointer mx-auto"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right: Product Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="line-through text-gray-500">
                            ₹{product.oldPrice || product.price + 2000}
                        </span>
                        <span className="text-green-600 font-bold text-xl">
                            ₹{product.price}
                        </span>
                    </div>

                    {(product.category?.toLowerCase() === "menshoes" ||
                        product.category?.toLowerCase() === "womenshoes") && (
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Select Size</label>
                                <select
                                    className="border rounded px-3 py-2 w-full"
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                >
                                    <option value="">-- Choose Size --</option>
                                    {(product.category?.toLowerCase() === "menshoes"
                                        ? [7, 8, 9, 10, 11, 12] // men sizes
                                        : [36, 37, 38, 39, 40, 41, 42] // women sizes
                                    ).map((s, idx) => (
                                        <option key={idx} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    <div className="bg-yellow-100 p-3 rounded mb-4 text-sm">
                        ₹299 Advance | Rest Cash on Delivery Available 🚚
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={async () => {
                                if (
                                    product.category?.toLowerCase() === "shoes" &&
                                    !selectedSize
                                ) {
                                    alert("Please select a size first!");
                                    return;
                                }
                                await addToCart(product);
                            }}
                            className="bg-black text-white py-2 px-4 rounded"
                        >
                            Add to Cart
                        </button>

                        <button className="bg-green-500 text-white py-2 px-4 rounded">
                            <a
                                href={`https://wa.me/917420864014?text=${encodeURIComponent(
                                    `*${product.title}*\n₹ ${product.price.toLocaleString(
                                        "en-IN"
                                    )}\n${window.location.href}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Order on WhatsApp
                            </a>
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {related.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-lg font-bold mb-4">Related Products</h3>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                    >
                        {related.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Link
                                    to={`/product/${item.title}`}
                                    state={item}
                                    className="block border rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={item.images[0]}
                                        alt={product.title}
                                        className="w-full max-h-[80px] object-contain rounded border cursor-pointer mx-auto"
                                    />
                                    <div className="p-3">
                                        <p className="text-sm font-semibold">{item.title}</p>
                                        <p className="text-green-600 font-bold">₹{item.price}</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
}
