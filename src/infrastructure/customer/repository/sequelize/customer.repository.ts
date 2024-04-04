import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActivate(),
            rewardPoints: entity.rewardPoint,
        })
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActivate(),
            rewardPoints: entity.rewardPoint
        }, {
            where: {
                id: entity.id,
            }
        })
    }
    async find(id: string): Promise<Customer> {
        let customerModel: CustomerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id
                },
                rejectOnEmpty: true
            });
        } catch (error) {
            throw new Error("Customer not found")
        }

        const address = new Address(
            customerModel.street, 
            customerModel.number, 
            customerModel.zipcode, 
            customerModel.city);
        const customer = new Customer(customerModel.id, customerModel.name);

        customer.Address = address;

        return customer;
    }
    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        let customers = customerModels.map((customerModel) => {
            let customer = new Customer(customerModel.id, customerModel.name);

            customer.addRewardPoints(customerModel.rewardPoints);
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipcode,
                customerModel.city,
            );
            customer.Address = address;

            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });

        return customers;
        // let customerList: Customer[] = [];
        // for (var i = 0; i < customerModels.length; i++) {
        //     let customer = new Customer(customerModels[i].id, customerModels[i].name);
        //     let address = new Address(customerModels[i].street, customerModels[i].number, customerModels[i].zipcode, customerModels[i].city);
        //     customer.Address = address;
        //     if (customerModels[i].active) customer.activate();
        //     customer.addRewardPoints(customerModels[i].rewardPoints);

        //     customerList.push(customer);

        // }

        // return customerList;

    }


}