import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

const url = "https://showcrew-backend.onrender.com" //|| "http://localhost:3000" "https://showcrew-backend.onrender.com"
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${url}/products/all`, {
        withCredentials: true,
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${url}/products/${id}`, {
        withCredentials: true,
      });
      alert(res.data.message);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

      {editingProduct ? (
        <ProductForm
          product={editingProduct}
          onSuccess={() => {
            setEditingProduct(null);
            fetchProducts();
          }}
        />
      ) : (
        <ProductForm onSuccess={fetchProducts} />
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Your Products</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-2 text-center">
                  No product found
                </td>
              </tr>
            ) : (
              products.map((p) => (
              
                <tr key={p._id}>
                  <td className="p-2 border">{p.title}</td>
                  <td className="p-2 border">${p.price}</td>
                  <td className="p-2 border">{p.stock}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => setEditingProduct(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => deleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
