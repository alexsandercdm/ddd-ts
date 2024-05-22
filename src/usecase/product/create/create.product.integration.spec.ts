import { Sequelize } from "sequelize-typescript";
import ProdudctModel from "../../../infrastructure/products/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/products/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";

describe("Teste integratrion created product", () => {
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

    it("Should be created a product", async () => {

        const repository = new ProductRepository();

        const product = ProductFactory.create("a", "Product Test", 25.99);
        const input = {
            type: "a",
            id: product.id,
            name: product.name,
            price: product.price,
        }

        const useCase = new CreateProductUseCase(repository);

        const output = await useCase.execute(input);

        expect(output.id).toBeDefined();
        expect(output.name).toEqual(product.name);
        expect(output.price).toEqual(product.price);

    });

    it("Should not created a product with price lower than zero", async () => {

        const repository = new ProductRepository();

        const input = {
            type: "a",
            id: "abc",
            name: "Product Test",
            price: 0,
        }

        const useCase = new CreateProductUseCase(repository);

        expect(useCase.execute(input)).rejects.toThrow("Price must be greater thean zaro");

    });

});