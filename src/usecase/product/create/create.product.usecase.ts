import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        
        const product = ProductFactory.create(input.type, input.name, input.price);
        await this.repository.create(product);

        return {
            id: input.id,
            name: input.name,
            price: input.price,
        }
    }
}