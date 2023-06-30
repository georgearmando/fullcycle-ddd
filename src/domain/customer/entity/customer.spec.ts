import { Address } from "../value-object/address";
import { Customer } from "./customer"

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrowError("Id is required")
  })


  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("id", "");
    }).toThrowError("Name is required")
  })

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Jane")

    expect(customer.name).toBe("Jane")
  })

  it("should activate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Rua dois", 2, "123-237", "Luanda");

    customer.address = address
    customer.activate();

    expect(customer.isActive()).toBe(true);
  })

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("123", "John");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  })

  it("should deactivate customer", () => {
    const customer = new Customer("123", "John");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  })

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  })
})