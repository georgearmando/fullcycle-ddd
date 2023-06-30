import { Sequelize } from "sequelize-typescript"
import { CustomerRepository } from "./customer.repository";
import { CustomerModel } from "./customer.model";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id} });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zip,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    })
  })

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id} });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zip,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    })
  })

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;
    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find(customer.id);

    expect(foundCustomer).toStrictEqual(customer);
  })

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    
    expect(async () => {
      await customerRepository.find("1");
    }).rejects.toThrow("Customer not found");
  })

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;
    await customerRepository.create(customer);

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.address = address2;
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer);
    expect(customers).toContainEqual(customer2);
  })
})