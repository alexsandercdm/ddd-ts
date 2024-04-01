import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";


describe("Customer repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City1");

        customer.Address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActivate(),
            rewardPoints: customer.rewardPoint,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });

    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City1");
        customer.Address = address;
        await customerRepository.create(customer);
        
        customer.changeName("Customer 2");
        const address2 = new Address("Street 2", 2, "Zipcode 2", "City2");
        customer.Address = address2;

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: "Customer 2",
            active: customer.isActivate(),
            rewardPoints: customer.rewardPoint,
            street: address2.street,
            number: address2.number,
            zipcode: address2.zip,
            city: address2.city,
        });
    });

    it("should find a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City1");

        customer.Address = address;

        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find("123");

        expect(foundCustomer).toStrictEqual(customer);

    });

    it("should throw an error when customer is no found", () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("456ABC");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "Customer 1");
        const customer2 = new Customer("456", "Customer 2");
        const customer3 = new Customer("789", "Customer 3");
        const address = new Address("Street 1", 1, "Zipcode 1", "City1");

        customer1.Address = address;
        customer2.Address = address;
        customer3.Address = address;

        const customers = [customer1, customer2, customer3];

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);
        await customerRepository.create(customer3);

        const foundCustomer = await customerRepository.findAll();

        expect(foundCustomer).toStrictEqual(customers);
    });

});

