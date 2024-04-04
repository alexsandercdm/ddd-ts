import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("sould throw error when id is empty", () => {
        expect(()=> {
            let customer = new Customer("", "John");
        }).toThrow("ID is required");
    });

    it("sould throw error when name is empty", () => {
        expect(()=> {
            let customer = new Customer("123", "");
        }).toThrow("Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("123", "Jhon");
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "12349-222", "Goiânia");

        customer.Address = address;

        customer.activate();

        expect(customer.isActivate()).toBe(true);
    });

    it("should thow error when address is undefined when you activave a customer", () => {

        expect(()=>{
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");

    });

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");

        customer.deactivate();

        expect(customer.isActivate()).toBe(false);
    });

    it("should add reward points", () => {

        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoint).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoint).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoint).toBe(20);


    });
});