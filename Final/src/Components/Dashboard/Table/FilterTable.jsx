export default function FilterTable({product,addToSelectedProducts})
{
    return <>
     <div
                    key={product.id}
                    className="p-4 bg-gray-100 rounded-lg shadow"
                  >
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <p>Stock: {product.quantity}</p>
                    <button
                      className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg"
                      onClick={addToSelectedProducts}
                    >
                      Add to Cart
                    </button>
                  </div>
    </>
}