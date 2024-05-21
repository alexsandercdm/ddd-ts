import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductsUseCase from "./list.product.usecase.dto";

const productA = ProductFactory.create("a", "Product Test A", 23.3);
const productB = ProductFactory.create("b", "Product Test B", 24.4);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test list products use case", () => {
    it("Should list products", async () => {
        const repositoryProduct = MockRepository();

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
