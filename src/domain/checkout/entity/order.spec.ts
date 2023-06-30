import { Order } from "./order"
import { OrderItem } from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("Id is required")
  })

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrowError("CustomerId is required")
  })

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("123", "123", []);
    }).toThrowError("Must have at least 1 item")
  })

  it("should calculate total", () => {
    const item = new OrderItem("123", "Item 1", 10, "p1", 2);
    const item2 = new OrderItem("1232", "Item 12", 20, "p2", 2);
    const order = new Order("01", "c1", [item, item2])

    const total = order.total()

    expect(total).toBe(60)
  })

  it("should throw if the item quantity is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("123", "Item 1", 10, "p1", 0);
      new Order("01", "c1", [item])
    }).toThrowError("Quantity must be greater than 0")
  })
})