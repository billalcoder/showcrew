import { ProductList } from "../components/ProductList";

export default function AdminPanel() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <ProductList />
    </div>
  );
}
