import Header from "./Header/Header";
import { fetchData } from "./utilities/ApiUti";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; 

export default function Historys() {
  const [historys, setHistory] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); 
  const API_URL = "http://localhost:5211/api/Order";

  const getHistory = async () => {
    try {
      const result = await fetchData(`${API_URL}/AllHistory`, "GET");
      setHistory(result);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const viewOrder = async (orderId) => {
    try {
      const result = await fetchData(`${API_URL}/ViewOrder/${orderId}`, "GET");
      setSelectedOrderDetails(result); 
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
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
                            <button
                              className="p-2 rounded-full group transition-all duration-500 flex items-center"
                              onClick={() => toggleModal("update", history)}
                            >
                              <FaEdit className="text-indigo-500 group-hover:text-indigo-600" />
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

      
      {selectedOrderDetails && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
          <table className="min-w-full mt-4">
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
      )}
    </>
  );
}
