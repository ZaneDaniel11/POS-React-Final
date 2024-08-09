import React from "react";

export default function UpdateModal({ isOpen, toggleModal, updateUsers, setAddProducts, product }) {
  if (!isOpen) return null; 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 md:mx-0">
        <form onSubmit={updateUsers}>
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
              onClick={toggleModal}
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
