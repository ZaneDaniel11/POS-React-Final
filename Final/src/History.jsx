import Header from "./Header/Header";
import { fetchData } from "./utilities/ApiUti";
import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa"; 

export default function Historys() {
  const [historys, setHistory] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const API_URL = "http://localhost:5211/api/Order";

  const getHistory = async () => {
    try {
      const result = await fetchData(`${API_URL}/AllHistory`, "GET");
      setHistory(result);
    } catch (error) {
      console.error("Error sa History", error);
    }
  };

  const viewOrder = async (orderId) => {
    try {
      const result = await fetchData(`${API_URL}/ViewOrder/${orderId}`, "GET");
      setSelectedOrderDetails(result);
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Error sa Order", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderDetails(null);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <Header />

      <div className="flex justify-center items-center mt-16">
        <div className="flex flex-col w-4/5">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
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
                        Order Date
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        Total Amount
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
                    {historys.map((history) => (
                      <tr
                        key={history.OrderId}
                        className="bg-white transition-all duration-500 hover:bg-gray-50"
                      >
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {history.OrderId}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {history.OrderDate}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                         ${history.TotalAmount}
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <button
                              className="p-2 rounded-full group transition-all duration-500 flex items-center"
                              onClick={() => viewOrder(history.OrderId)}
                            >
                              <FaEye className="text-blue-500 group-hover:text-blue-600" />
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

=
      {isModalOpen && selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="p-5 text-left text-sm leading-6 font-semibold text-gray-900">Product Name</th>
                    <th className="p-5 text-left text-sm leading-6 font-semibold text-gray-900">Quantity</th>
                    <th className="p-5 text-left text-sm leading-6 font-semibold text-gray-900">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderDetails.map((item, index) => (
                    <tr key={index}>
                      <td className="p-5 text-sm leading-6 font-medium text-gray-900">{item.ProductName}</td>
                      <td className="p-5 text-sm leading-6 font-medium text-gray-900">{item.Quantity}</td>
                      <td className="p-5 text-sm leading-6 font-medium text-gray-900">${item.Price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t">
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
