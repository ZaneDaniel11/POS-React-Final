using Microsoft.AspNetCore.Mvc;
using Dapper;
using Microsoft.Data.Sqlite;
using System.Threading.Tasks;
using System.Linq;

namespace Dapper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductApiController : ControllerBase
    {
        private readonly SqliteConnection _connection = new SqliteConnection("Data Source=Final-pos.db");

        // Get all products
        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            const string query = "SELECT * FROM Product_tb";
            var result = await _connection.QueryAsync<Product>(query);

            if (!result.Any())
                return BadRequest("No products found.");

            return Ok(result);
        }

        // Save a new product
        [HttpPost("SaveProduct")]
        public async Task<IActionResult> SaveProductAsync(Product product)
        {
            const string query = @"
                INSERT INTO Product_tb (Name, Sku, Price, Quantity) 
                VALUES (@Name, @Sku, @Price, @Quantity);
                SELECT * FROM Product_tb ORDER BY Id DESC LIMIT 1";
                
            var result = await _connection.QueryAsync<Product>(query, product);

            return Ok(result);
        }

        // Update an existing product
        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> UpdateProductAsync(int id, Product product)
        {
            const string query = @"
                UPDATE Product_tb 
                SET Name = @Name, Sku = @Sku, Price = @Price, Quantity = @Quantity 
                WHERE Id = @Id;
                SELECT * FROM Product_tb WHERE Id = @Id LIMIT 1";
                
            var result = await _connection.QueryAsync<Product>(query, new
            {
                Id = id,
                Name = product.Name,
                Sku = product.Sku,
                Price = product.Price,
                Quantity = product.Quantity
            });

            return Ok(result);
        }

        // Delete a product
        [HttpDelete("DeleteProduct")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            const string query = "DELETE FROM Product_tb WHERE Id = @Id";
            await _connection.QueryAsync<Product>(query, new { Id = id });

            return Ok();
        }
    }
  
}
