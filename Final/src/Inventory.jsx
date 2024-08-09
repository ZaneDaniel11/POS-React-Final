import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; 
import Header from "./Header/Header";
import { fetchData } from "./utilities/ApiUti";
import UpdateModal from "./Components/Inventory/Modals/UpdateModal";
import DeleteModal from "./Components/Inventory/Modals/DeleteModal";
import AddModal from "./Components/Inventory/Modals/AddModal";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modals, setModals] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [product, setAddProducts] = useState({
    Name: "",
    sku: "",
    price: "",
    quantity: "", 
  });

  const API_URL = "http://localhost:5211/api/ProductApi";

  async function addUsers(e) {
    e.preventDefault();
    await fetchData(`${API_URL}/SaveProduct`, "POST", {
      id: 0,
      name: product.Name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity, 
    });
    toggleModal("add");
    getProducts();
  }

  async function updateUsers(e) {
    e.preventDefault();
    try {
      await fetchData(`${API_URL}/UpdateProduct?Id=${currentItem.id}`, "PUT", {
        id: currentItem.id,
        name: product.Name,
        sku: product.sku,
        price: product.price,
        quantity: product.quantity, 
      });
      getProducts();
      toggleModal("update");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user. Please try again.");
    }
  }

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
        toggleModal("delete");
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert(`Failed to delete product. Error: ${error.message}`);
      }
    } else {
      console.error("No current item to delete.");
      alert("No product selected for deletion.");
    }
  };

  const toggleModal = (modalType, item = null) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalType]: !prevModals[modalType],
    }));
    setCurrentItem(item);

    if (modalType === "update" && item) {
      setAddProducts({
        Name: item.name,
        sku: item.sku,
        price: item.price,
        quantity: item.quantity, 
      });
    } else if (modalType === "add") {
      setAddProducts({ Name: "", sku: "", price: "", quantity: "" }); 
    }
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
                  onClick={() => toggleModal("add")}
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
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {product.quantity}
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <button
                              className="p-2 rounded-full group transition-all duration-500 flex items-center"
                              onClick={() => toggleModal("update", product)}
                            >
                              <FaEdit className="text-indigo-500 group-hover:text-indigo-600" />
                            </button>
                            <button
                              className="p-2 rounded-full group transition-all duration-500 flex items-center"
                              onClick={() => toggleModal("delete", product)}
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
      <DeleteModal
      isOpen={modals.delete}
      toggleModal ={() => toggleModal("delete")}
      handleDeleteProduct = {handleDeleteProduct}
      />

      <AddModal
      isOpen = {modals.add}
      addUsers ={addUsers}
      setAddProducts ={setAddProducts}
      product={product}
      toggleModal={() => toggleModal("add")}
      />

      {/* {modals.add && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 md:mx-0">
            <form onSubmit={addUsers}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={product.Name}
                  onChange={(e) =>
                    setAddProducts({ ...product, Name: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="sku" className="block text-sm font-medium">
                  SKU
                </label>
                <input
                  type="text"
                  id="sku"
                  value={product.sku}
                  onChange={(e) =>
                    setAddProducts({ ...product, sku: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="price" className="block text-sm font-medium">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={product.price}
                  onChange={(e) =>
                    setAddProducts({ ...product, price: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="quantity" className="block text-sm font-medium">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={product.quantity}
                  onChange={(e) =>
                    setAddProducts({ ...product, quantity: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => toggleModal("add")}
                  className="text-gray-500 hover:text-gray-700 mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

<UpdateModal
isOpen={modals.update}
toggleModal ={() => toggleModal("update")}
updateUsers ={updateUsers}
setAddProducts ={setAddProducts}
product ={product}
/>
    </>
  );
}
