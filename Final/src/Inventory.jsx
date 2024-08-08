import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import { fetchData } from "./utilities/ApiUti";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5211/api/ProductApi/";

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
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none min-h-4"
                  type="button"
                >
                  Add
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
                        Sku
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
                      <tr key={product.id} className="bg-white transition-all duration-500 hover:bg-gray-50">
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
                          <div className="flex items-center gap-1">
                            <button className="p-2 rounded-full group transition-all duration-500 flex items-center">
                              <svg
                                className="cursor-pointer"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="fill-indigo-500"
                                  d="M9.53414 8.15675L8.96459 7.59496L8.96459 7.59496L9.53414 8.15675ZM13.8911 3.73968L13.3215 3.17789V3.17789L13.8911 3.73968ZM16.3154 3.75892L15.7367 4.31126L15.7367 4.31127L16.3154 3.75892ZM16.38 3.82658L16.9587 3.27423L16.9587 3.27423L16.38 3.82658ZM16.3401 6.13595L15.7803 5.56438L16.3401 6.13595ZM11.9186 10.4658L12.4784 11.0374L11.9186 10.4658ZM11.1223 10.9017L10.9404 10.1226V10.1226L11.1223 10.9017ZM9.07259 10.9951L8.52556 11.5788L8.52556 11.5788L9.07259 10.9951ZM9.09713 8.9664L9.87963 9.1328V9.1328L9.09713 8.9664ZM9.05721 10.9803L8.49542 11.5498H8.49542L9.05721 10.9803ZM17.1679 4.99458L16.368 4.98075V4.98075L17.1679 4.99458ZM15.1107 2.8693L15.1171 2.06932L15.1107 2.8693ZM9.22851 8.51246L8.52589 8.12992L8.52452 8.13247L9.22851 8.51246ZM9.22567 8.51772L8.52168 8.13773L8.5203 8.1403L9.22567 8.51772ZM11.5684 10.7654L11.9531 11.4668L11.9536 11.4666L11.5684 10.7654ZM11.5669 10.7662L11.9507 11.4681L11.9516 11.4676L11.5669 10.7662ZM11.3235 3.30005C11.7654 3.30005 12.1235 2.94188 12.1235 2.50005C12.1235 2.05822 11.7654 1.70005 11.3235 1.70005V3.30005ZM18.3 9.55887C18.3 9.11705 17.9418 8.75887 17.5 8.75887C17.0582 8.75887 16.7 9.11705 16.7 9.55887H18.3ZM3.47631 16.5237L4.042 15.9581H4.042L3.47631 16.5237ZM16.5237 16.5237L15.958 15.9581L15.958 15.9581L16.5237 16.5237ZM10.1037 8.71855L14.4606 4.30148L13.3215 3.17789L8.96459 7.59496L10.1037 8.71855ZM15.7367 4.31127L15.8013 4.37893L16.9587 3.27423L16.8941 3.20658L15.7367 4.31126ZM15.7803 5.56438L11.3588 9.89429L12.4784 11.0374L16.9 6.70749L15.7803 5.56438ZM10.3584 11.7085L10.9238 12.2708L11.9133 11.1026L11.3478 10.5403L10.3584 11.7085ZM10.3042 10.1482L10.4861 10.9273L11.7585 10.8761L11.5766 10.097L10.3042 10.1482ZM10.6048 10.4113L8.55448 10.5047L8.74555 11.4555L10.7958 11.3621L10.6048 10.4113ZM8.79521 10.4518L8.23342 11.0213L9.01774 11.5576L9.57953 10.9881L8.79521 10.4518ZM9.83455 8.8L8.74688 10.264L9.44739 10.7356L10.5351 9.27155L9.83455 8.8ZM8.52452 8.13247L8.51236 8.13609L9.21634 8.51608L9.22851 8.51246L8.52452 8.13247ZM8.51867 8.137L8.50114 8.17994L9.20474 8.55745L9.22226 8.51452L8.51867 8.137ZM8.51294 8.18271L7.709 8.51516L7.92381 9.11545L8.72775 8.78301L8.51294 8.18271ZM11.9536 11.4666L10.8585 12.4393L11.4396 13.1558L12.5347 12.183L11.9536 11.4666ZM10.1828 10.5638L8.1325 10.6572L8.16647 11.4445L10.2168 11.3511L10.1828 10.5638ZM10.1246 11.2558L9.04927 12.3753L9.9759 13.1318L11.0512 12.0123L10.1246 11.2558ZM15.9559 15.9559L3.57399 3.57399L3.37863 3.76934L15.7605 16.1512L15.9559 15.9559ZM4.042 15.9581C2.58315 14.4992 2.58315 12.0926 4.042 10.6337L3.47631 10.0681C1.59138 11.953 1.59138 15.1275 3.47631 17.0124L4.042 15.9581ZM10.6337 4.042C12.0926 2.58315 14.4992 2.58315 15.958 4.042L16.5237 3.47631C14.6387 1.59138 11.4642 1.59138 9.57928 3.47631L10.6337 4Z"
                                />
                                <path
                                  className="fill-current text-indigo-500 transition-colors duration-200 group-hover:text-indigo-600"
                                  d="M15.7605 16.1512L3.37863 3.76934L3.57399 3.57399L15.9559 15.9559L15.7605 16.1512Z"
                                />
                              </svg>
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
    </>
  );
}
