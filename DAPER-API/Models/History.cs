public class History
{
    public int HistoryId { get; set; } // Primary Key
    public int OrderId { get; set; } // Foreign key to the Order_tb table (not enforced by DB constraints)
    public string ProductName { get; set; } // Name of the product purchased
    public int Quantity { get; set; } // Quantity of the product purchased
    public decimal Price { get; set; } // Price of the product
}
