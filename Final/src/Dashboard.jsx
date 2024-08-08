import Header from "./Header/Header";
import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { fetchData } from "./utilities/ApiUti";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({}); // State for managing input quantities
  const API_URL = "http://localhost:5211/api/ProductApi";
  const ORDER_API_URL = "http://localhost:5211/api/Order/";

  const getProducts = async () => {
    setLoading(true);
    try {
      const result = await fetchData(`${API_URL}/GetProducts`, "GET");
      setProducts(result);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToSelectedProducts = (product) => {
    if (product.quantity <= 0) return; // Prevent adding products with 0 quantity

    setSelectedProducts((prevSelected) => {
      const existingProduct = prevSelected.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevSelected.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevSelected, { ...product, quantity: 1 }];
      }
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const incrementQuantity = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product.quantity <= 0) return;

    setSelectedProducts((prevSelected) =>
      prevSelected.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const decrementQuantity = (productId) => {
    const selectedProduct = selectedProducts.find((p) => p.id === productId);
    if (selectedProduct && selectedProduct.quantity > 1) {
      setSelectedProducts((prevSelected) =>
        prevSelected.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
      );

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((p) => p.id !== productId)
      );

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    }
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    if (selectedProducts.length === 0) {
      alert("No products selected for checkout.");
      return;
    }

    try {
      const response = await fetch(`${ORDER_API_URL}/Checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProducts),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order.");
      }

      // Clear the selected products after successful checkout
      setSelectedProducts([]);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center mt-16">
        <div className="flex flex-row w-4/5">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-100 p-4 rounded-lg mr-4">
            <h2 className="text-lg font-bold mb-4">Selected Products</h2>
            {selectedProducts.length === 0 ? (
              <p>No products selected</p>
            ) : (
              <>
                <ul>
                  {selectedProducts.map((product) => (
                    <li
                      key={product.id}
                      className="p-2 bg-white mb-2 rounded-lg shadow flex justify-between items-center"
                    >
                      <span>
                        {product.name} - {product.price} x {product.quantity}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrementQuantity(product.id)}
                          className="p-1 bg-gray-300 rounded-full"
                        >
                          <FaMinus />
                        </button>
                        <button
                          onClick={() => incrementQuantity(product.id)}
                          className="p-1 bg-gray-300 rounded-full"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 font-bold">
                  Total Price: ${calculateTotalPrice()}
                </div>
                <button
                  className="mt-4 w-full bg-green-500 text-white p-2 rounded-lg"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </>
            )}
          </div>

          {/* Product Table */}
          <div className="flex flex-col w-3/4">
            <div className="overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="relative text-gray-500 focus-within:text-gray-900 mb-4 flex justify-between">
                  <input
                    type="text"
                    id="default-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                    placeholder="Search for Name"
                  />
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full rounded-xl">
                    <thead>
                      <tr className="bg-gray-50">
                        <th
                          scope="col"
                          className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                        >
                          SKU
                        </th>
                        <th
                          scope="col"
                          className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="bg-white transition-all duration-500 hover:bg-gray-50"
                        >
                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {product.sku}
                          </td>
                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {product.price}
                          </td>
                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {product.quantity}
                          </td>
                          <td className="p-5">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => addToSelectedProducts(product)}
                                className="p-2 bg-blue-500 text-white rounded-lg"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
