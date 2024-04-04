import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import Address from "../../value-object/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1WhenCustomerIsCreatedHandler from "./handler/send-consolelog1-when-customer-is-created.handler";
import EnviaConsoleLog2WhenCustomerIsCreatedHandler from "./handler/send-consolelog2-when-customer-is-created.handler";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
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

});