
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductService from "../../../domain/product/service/product.services";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {

        var product = await this.repository.find(input.id);

        product = ProductService.changeName(product as Product, input.name);
        product = ProductService.changePrice(product as Product, input.price);

        await this.repository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            type: input.type,
        }
    }
}