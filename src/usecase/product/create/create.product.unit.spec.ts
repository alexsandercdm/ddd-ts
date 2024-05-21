import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit teste create a product", () => {
    it ("should be create a product", async () => {
        const productRepository = MockRepository();

        const useCase = new CreateProductUseCase(productRepository);

        const product = {
            type: "a",
            id: "abc",
            name: "Product Test",
            price: 24.99,
        }

        const output = await useCase.execute(product);

        expect(output.id).toEqual(product.id);
        expect(output.name).toEqual(product.name);
        expect(output.price).toEqual(product.price);
    });
});