import ProductInterface from "../../../domain/product/entity/products.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductsDto } from "./list.product.dto";

export default class ListProductsUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: InputListProductDto | {}): Promise<OutputListProductsDto> {
        const products = await this.repository.findAll();
        return OutputMap.toOutputmap(products);
        
    }
}

class OutputMap {
    static toOutputmap(products: ProductInterface[]) : OutputListProductsDto{
        return {
            products: products.map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price,
            }))
        }
    }
}