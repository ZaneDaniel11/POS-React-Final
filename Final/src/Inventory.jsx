import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Importing icons from react-icons
import Header from "./Header/Header";
import { fetchData } from "./utilities/ApiUti";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = "http://localhost:5211/api/ProductApi";

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

  const handleDeleteProduct = async () => {
    if (currentItem && currentItem.id) {
      try {
        const response = await fetchData(
          `${API_URL}/DeleteProduct?id=${currentItem.id}`,
          "DELETE"
        );
        console.log("Delete response:", response);
        getProducts();
        toggleModal(); // Close the modal after deleting the product
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert(`Failed to delete product. Error: ${error.message}`);
      }
    } else {
      console.error("No current item to delete.");
      alert("No product selected for deletion.");
    }
  };

  const toggleModal = (item = null) => {
    setIsModalOpen(!isModalOpen);
    setCurrentItem(item);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="flex justify-center items-center mt-16">
        <div className="flex flex-col w-4/5">
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
                <button
                  className="flex items-center justify-center py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85]"
                  type="button"
                >
                  <FaPlus className="mr-2" /> Add
                </button>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full rounded-xl">
                  <thead>
                    <tr className="bg-gray-50">
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                      >
                        ID
                      </th>
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
                          {product.id}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {product.sku}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {product.price}
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <button className="p-2 rounded-full group transition-all duration-500 flex items-center">
                              <FaEdit className="text-indigo-500 group-hover:text-indigo-600" />
                            </button>
                            <button
                              className="p-2 rounded-full group transition-all duration-500 flex items-center"
                              onClick={() => toggleModal(product)}
                            >
                              <FaTrash className="text-red-500 group-hover:text-red-600" />
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
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
          <div className="loader" />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 md:mx-0">
            <div className="flex justify-between items-center">
              <h5 className="text-lg font-semibold">Delete Confirmation</h5>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <p className="mt-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
