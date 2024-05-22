import express, {Request, Response} from 'express';
import CustomerCreatedUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import FindCustomerUseCase from '../../../usecase/customer/find/find.customer.usecase';
import CustomerPresenters from '../presenters/customer.presenter';

export const customerRoute = express.Router();

customerRoute.post("/",async  (req:Request, res: Response) => {
    const usecase = new CustomerCreatedUseCase(new CustomerRepository());

    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip,

            }
        }

        const output = await usecase.execute(customerDto);

        res.send(output);
    } catch (error) {   
        res.status(500).send(error);
    }   
});

customerRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    const output = await usecase.execute({});

    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(CustomerPresenters.toXML(output)),
    })

    // try {
    //     res.send(output);
    // } catch (error) {
    //     res.status(500).send(error);
    // }
});

customerRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindCustomerUseCase(new CustomerRepository());

    try {
        const output = await usecase.execute({id: req.params.id});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});