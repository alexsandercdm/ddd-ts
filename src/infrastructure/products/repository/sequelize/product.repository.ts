import Product from "../../../../domain/product/entity/product";
import ProductInterface from "../../../../domain/product/entity/products.interface";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProdudctModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: ProductInterface): Promise<void> {
        await ProdudctModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        })
    }
    async update(entity: ProductInterface): Promise<void> {
        await ProdudctModel.update({
            name: entity.name,
            price: entity.price,
        }, {
            where: {
                id: entity.id,
            }
        })
    }
    async find(id: string): Promise<ProductInterface> {
        const productModel = await ProdudctModel.findOne({ where: { id } });

        return new Product(productModel.id, productModel.name, productModel.price);
    }
    async findAll(): Promise<ProductInterface[]> {
        const productModels = await ProdudctModel.findAll();
        return productModels.map((productModel) =>
            new Product(productModel.id, productModel.name, productModel.price));
    }

}