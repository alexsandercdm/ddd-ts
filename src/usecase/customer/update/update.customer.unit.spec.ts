import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("street", 123, "zip", "city"),
);

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "zip Updated",
        city: "city Updated",
    },
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test update customer", () => {
    it("Should update a customer", async () => {
        const customerRepository = MockRepository();
        const cunstomerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await cunstomerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});