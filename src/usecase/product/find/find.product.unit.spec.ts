import FindProductUseCase from "./find.product.usecase";

const input = {
    id: "123",
}

const product = {
    id: "123",
    name: "Product test",
    price: 10,
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }

}

describe("Unit test find product", () => {
    it("should return a product", async () => {
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(product).toEqual(output);

    });
});