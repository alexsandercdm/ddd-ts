import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

const product = ProductFactory.create(
    "a", 
    "Product Test",
    24.99,
);

const updateProd = {
    type: "a",
    id: product.id,
    name: "Produto Atualizado 1",
    price: 32.3,
}


describe("Unit test update product use case", () => {
    it ("Should update a product", async () => {
        const repositoryProduct = MockRepository();
        
        const useCaseUpdate = new UpdateProductUseCase(repositoryProduct);

        const output = await useCaseUpdate.execute(updateProd);

        expect(output).toEqual(updateProd);

    });
});