import Product from "../entity/product";

export default class ProductService {
    static increasePrice(products: Product[], percentage: number): Product[]{
        products.forEach(product => {
            product.changePrice((product.price * percentage) / 100 + product.price);
        });

        return products;
    }

    static changeName(product: Product, name: string): Product {
        product.changeName(name);
        return product;
    }

    static changePrice(product: Product, price: number): Product {
        product.changePrice(price);
        return product;
    }
}