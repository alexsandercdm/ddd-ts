import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { OutputListCustomerDto } from "./list.customer.dto";


export default class ListCustomerUseCase {
    private repository: CustomerRepositoryInterface;

    constructor(repository: CustomerRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: ListCustomerUseCase | {}): Promise<OutputListCustomerDto> {
        const customers = await this.repository.findAll();
        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto {
        return {
            customers: customer.map((c) =>
            ({
                id: c.id,
                name: c.name,
                address: {
                    street: c.address.street,
                    number: c.address.number,
                    zip: c.address.zip,
                    city: c.address.city,
                }
            })
            ),
        }
    }
}