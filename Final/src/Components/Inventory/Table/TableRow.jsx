
import { FaEdit, FaTrash } from "react-icons/fa"; 
export default function TableRow({product,UpdateModal,DeleteModal})
{
    return <>
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
              onClick={UpdateModal}
            >
              <FaEdit className="text-indigo-500 group-hover:text-indigo-600" />
            </button>
            <button
              className="p-2 rounded-full group transition-all duration-500 flex items-center"
              onClick={DeleteModal}
            >
              <FaTrash className="text-red-500 group-hover:text-red-600" />
            </button>
          </div>
        </td>
      </tr>
      </>
}