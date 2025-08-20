
export function RazorpayButton({ total, user, cartItems }) {
    const handlePayment = () => {
        const options = {
            key: "rzp_test_DpYElJWMGP4XNv", // Use test key or live key
            amount: total * 100, // Razorpay expects paise (e.g. ₹500 = 50000)
            currency: "INR",
            name: "MegaNET",
            description: "Purchase Items",
            image: "https://yourwebsite.com/logo.png", // Optional
            handler: function (response) {
                alert(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                console.log("Cart:", cartItems);
                console.log("User:", user);
                // TODO: send order info to backend here
            },
            prefill: {
                name: user?.name || "Test User",
                email: user?.email || "test@example.com",
                contact: user?.phone || "9999999999",
            },
            theme: {
                color: "#3399cc",
            }
        }

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
            console.error("Payment Failed", response.error);
            alert("❌ Payment Failed: " + response.error.description);
        });

        rzp.open();
    };

    return (
        <button 
            onClick={handlePayment}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
            Pay ₹{total}
        </button>
    )
}
