public class Order
{
    public int OrderId { get; set; } // Primary Key
    public string OrderDate { get; set; } // Date of the order, stored as a string
    public decimal TotalAmount { get; set; } // Total amount paid for the order
}
