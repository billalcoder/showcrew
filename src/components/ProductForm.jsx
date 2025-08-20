import { useState } from "react";
import axios from "axios";

export default function ProductForm({ product, onSuccess }) {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    price: product?.price || "",
    stock: product?.stock || "",
    description: product?.description || "",
    category: product?.category || "",
    brand: product?.brand || "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      let res;
      if (product?._id) {
        // UPDATE
        res = await axios.put(
          `https://showcrew-backend.onrender.com/products/${product._id}`,
          formData,
          { withCredentials: true }
        );
      } else {
        // CREATE
        res = await axios.post("https://showcrew-backend.onrender.com/products", data, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      console.log(res.data);

      // ✅ Reset form after success
      setFormData({
        title: "",
        price: "",
        stock: "",
        description: "",
        category: "",
        brand: "",
      });
      setImages([]);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Product Title"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock Quantity"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Brand"
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
