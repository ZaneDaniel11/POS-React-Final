using Microsoft.AspNetCore.Mvc;
using Dapper;
using Microsoft.Data.Sqlite;


namespace Daper_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly string _connectionString = "Data Source=Final-pos.db";

        [HttpPost("Checkout")]
        public async Task<IActionResult> Checkout([FromBody] List<Product> selectedProducts)
        {
            if (selectedProducts == null || !selectedProducts.Any())
                return BadRequest("No products selected.");

            var totalAmount = selectedProducts.Sum(p => p.Price * p.Quantity);
            var orderDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            using (var connection = new SqliteConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                       
                        const string insertOrderQuery = "INSERT INTO Order_tb (OrderDate, TotalAmount) VALUES (@OrderDate, @TotalAmount); SELECT last_insert_rowid();";
                        var orderId = await connection.ExecuteScalarAsync<int>(insertOrderQuery, new { OrderDate = orderDate, TotalAmount = totalAmount }, transaction);

                        const string insertHistoryQuery = "INSERT INTO History_tb (OrderId, ProductName, Quantity, Price) VALUES (@OrderId, @ProductName, @Quantity, @Price)";
                        const string updateProductQuantityQuery = "UPDATE Product_tb SET Quantity = Quantity - @Quantity WHERE Name = @ProductName";

                        foreach (var product in selectedProducts)
                        {
                           
                            await connection.ExecuteAsync(insertHistoryQuery, new { OrderId = orderId, ProductName = product.Name, Quantity = product.Quantity, Price = product.Price }, transaction);

                           
                            await connection.ExecuteAsync(updateProductQuantityQuery, new { ProductName = product.Name, Quantity = product.Quantity }, transaction);
                        }

                        transaction.Commit();
                        return Ok(new { OrderId = orderId });
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return StatusCode (500, $"Internal server error:{ex.Message}");
                    }
                }
            }
        }

        [HttpGet("ViewOrder/{orderId}")]
        public async Task<IActionResult> ViewOrder(int orderId)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                await connection.OpenAsync();

                const string query = @"
                    SELECT o.OrderDate, o.TotalAmount, h.ProductName, h.Quantity, h.Price
                    FROM Order_tb o
                    JOIN History_tb h ON o.OrderId = h.OrderId
                    WHERE o.OrderId = @OrderId";
                
                var orderDetails = await connection.QueryAsync(query, new { OrderId = orderId });
                
                if (!orderDetails.Any())
                    return NotFound("Order not found.");

                return Ok(orderDetails);
            }
        }

        [HttpGet("AllHistory")]
        public async Task<IActionResult> GetAllHistory()
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                await connection.OpenAsync();

                const string query = "SELECT * FROM Order_tb";
                
                var allHistory = await connection.QueryAsync(query);

                if (!allHistory.Any())
                    return NotFound("No history found.");

                return Ok(allHistory);
            }
        }
    }
}
