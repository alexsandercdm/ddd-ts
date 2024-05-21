import { Sequelize } from "sequelize-typescript";
import ProdudctModel from "../../../infrastructure/products/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/products/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test find a product", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ProdudctModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should return a product", async () => {
        const productRepository = new ProductRepository();
        const product = ProductFactory.create("a", "Product Test", 10);
        const verifyProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
        }

        await productRepository.create(product as Product);

        const usecase = new FindProductUseCase(productRepository);

        const output = await usecase.execute(product);

        expect(output).toEqual(verifyProduct);
    });
});