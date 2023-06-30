import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("John");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  })

  it("should create a customer with an address", () => {
    const address = new Address("Rua dois", 2, "123-237", "Luanda");
    let customer = CustomerFactory.createWithAddress("John", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBe(address);
  })
})