import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../products/repository/sequelize/product.repository';
import ProductFactory from '../../../domain/product/factory/product.factory';
import UpdateProductUseCase from '../../../usecase/product/update/update.product.usecase';
import FindProductUseCase from '../../../usecase/product/find/find.product.usecase';
import ListProductsUseCase from '../../../usecase/product/list/list.product.usecase.dto';

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    const usecaseP = new FindProductUseCase(new ProductRepository());

    try {

        const productDto = {
            id: "",
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
        }

        const output = await usecase.execute(productDto);

        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindProductUseCase(new ProductRepository());

    try {
        const output = await usecase.execute({ id: req.params.id });
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductsUseCase(new ProductRepository());

    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.post("/:id", async (req: Request, res: Response) => {
    const repository = new ProductRepository();
    const usecase = new UpdateProductUseCase(repository);
    const usecaseFind = new FindProductUseCase(repository);

    let product = await usecaseFind.execute({ id: req.params.id });


    try {
        const productDto = {
            id: product.id,
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
        }

        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});