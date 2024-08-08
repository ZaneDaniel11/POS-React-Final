using Microsoft.AspNetCore.Mvc;
using Dapper;
using Microsoft.Data.Sqlite;
using System.Threading.Tasks;
using System.Linq;

namespace Daper_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly SqliteConnection _connection = new SqliteConnection("Data Source=Final-pos.db");

     [HttpPost("Checkout")]
public async Task<IActionResult> Checkout([FromBody] List<Product> selectedProducts)
{
    if (selectedProducts == null || !selectedProducts.Any())
        return BadRequest("No products selected.");
 
    var totalAmount = selectedProducts.Sum(p => p.Price * p.Quantity);
    var orderDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

    // Insert into Order_history
    const string insertOrderQuery = "INSERT INTO Order_tb (OrderDate, TotalAmount) VALUES (@OrderDate, @TotalAmount); SELECT last_insert_rowid();";
    var orderId = await _connection.ExecuteScalarAsync<int>(insertOrderQuery, new { OrderDate = orderDate, TotalAmount = totalAmount });

    // Insert each product into HistoryTable
    const string insertHistoryQuery = "INSERT INTO History_tb (OrderId, ProductName, Quantity, Price) VALUES (@OrderId, @ProductName, @Quantity, @Price)";
    foreach (var product in selectedProducts)
    {
        await _connection.ExecuteAsync(insertHistoryQuery, new { OrderId = orderId, ProductName = product.Name, Quantity = product.Quantity, Price = product.Price });
    }

    return Ok(new { OrderId = orderId });
}

    [HttpGet("ViewOrder/{orderId}")]
public async Task<IActionResult> ViewOrder(int orderId)
{
    const string query = @"
        SELECT o.OrderDate, o.TotalAmount, h.ProductName, h.Quantity, h.Price
        FROM Order_tb o
        JOIN History_tb h ON o.OrderId = h.OrderId
        WHERE o.OrderId = @OrderId";
    
    var orderDetails = await _connection.QueryAsync(query, new { OrderId = orderId });
    
    if (!orderDetails.Any())
        return NotFound("Order not found.");

    return Ok(orderDetails);
}
}
}