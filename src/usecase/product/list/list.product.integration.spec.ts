import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductsUseCase from "./list.product.usecase.dto";
import ProdudctModel from "../../../infrastructure/products/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/products/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/product-b";

const productA = ProductFactory.create("a", "Product Test A", 23.3) as Product;
const productB = ProductFactory.create("b", "Product Test B", 24.4) as ProductB;


describe("Test integration list products use case", () => {

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

    it("Should list products", async () => {
        const repositoryProduct = new ProductRepository();

        await repositoryProduct.create(productA as Product);
        await repositoryProduct.create(productB);

        const useCase = new ListProductsUseCase(repositoryProduct);

        const output = await useCase.execute({});

        expect(productA.id).toEqual(output.products[0].id);
        expect(productA.name).toEqual(output.products[0].name);
        expect(productA.price).toEqual(output.products[0].price);

        expect(productB.id).toEqual(output.products[1].id);
        expect(productB.name).toEqual(output.products[1].name);
        expect(productB.price).toEqual(output.products[1].price);
    });
});
