import { Sequelize } from "sequelize-typescript";
import ProdudctModel from "../../../infrastructure/products/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/products/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = ProductFactory.create(
    "a",
    "Product Test",
    24.33,
);


const input = {
    id: product.id,
    type: "a",
    name: "Product Updated",
    price: 32.33,
}

describe("Test integration update use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProdudctModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should test integration update a product ", async () => {

        const productRepository = new ProductRepository();
        const useCaseCreate = new CreateProductUseCase(productRepository);
        const useCase = new UpdateProductUseCase(productRepository);
        const prod1 = {
            id: product.id,
            name: product.name,
            price: product.price,
            type: "a"

        }

        await productRepository.create(product as Product);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });


});