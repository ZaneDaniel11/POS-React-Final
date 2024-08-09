import { FaPlus, FaMinus } from "react-icons/fa";
export default function Products({product,decrementQuantity,incrementQuantity})
{
    return <>
     <li
                      key={product.id}
                      className="p-2 bg-white mb-2 rounded-lg shadow flex justify-between items-center"
                    >
                      <span>
                        {product.name} - {product.price} x {product.quantity}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={decrementQuantity}
                          className="p-1 bg-gray-300 rounded-full"
                        >
                          <FaMinus />
                        </button>
                        <button
                          onClick={incrementQuantity}
                          className="p-1 bg-gray-300 rounded-full"
                        >
                          <FaPlus />
                        </button>
                      </div>
    </li>
    </>
}