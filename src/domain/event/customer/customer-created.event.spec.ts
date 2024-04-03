import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1WhenCustomerIsCreatedHandler from "./handler/envia-consolelog1-when-customer-is-created.handler";
import EnviaConsoleLog2WhenCustomerIsCreatedHandler from "./handler/envia-consolelog2-when-customer-is-created.handler";
import CustomerModel from "../../../infrastructure/db/sequelize/model/customer.model";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import SendDataNotifyCustomerAddressChanged from "./handler/send-data-notify-customer-address-changed.handler";

describe("Domain Event Customer test", () => {

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
    });


    it("should trigger an event when a customer is created", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Rua tal", 12, "74000-000", "Goiânia");

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

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler();
        const customerEvent = new CustomerCreatedEvent({
            customer_id: customer.id,
            name: customer.name,
            endereco: `${customer.address.street} - ${customer.address.number} - ${customer.address.city} - ${customer.address.zip}`,
        });
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handler");;
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handler");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        eventDispatcher.notify(customerEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

    });

    it("Should trigger event when a customer address changed",async  () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Rua tal", 12, "74000-000", "Goiânia");

        customer.Address = address;

        await customerRepository.create(customer);

        const newAddress = new Address("Rua Nova 123", 44, "74000-123", "Goiânia");

        customer.changeAddress(newAddress);
        customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActivate(),
            rewardPoints: customer.rewardPoint,
            street: newAddress.street,
            number: newAddress.number,
            zipcode: newAddress.zip,
            city: newAddress.city,
        });

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendDataNotifyCustomerAddressChanged();
        const spyEventHandler = jest.spyOn(eventHandler, "handler");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id_customer: customer.id, 
            name_customer: customer.name,
            address_customer_old: {
                street: address.street,
                number: address.number,
                zipcode: address.zip,
                city: address.city
            },
            address_customer_atual: {
                street: newAddress.street,
                number: newAddress.number,
                zipcode: newAddress.zip,
                city: newAddress.city
            },
        });

        eventDispatcher.notify(customerAddressChangedEvent);
        
        expect(spyEventHandler).toHaveBeenCalled();


    });

});