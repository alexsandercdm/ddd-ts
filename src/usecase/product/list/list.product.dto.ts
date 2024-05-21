export interface InputListProductDto {}

export interface OutputListProductsDto {
    products: Product[];
}

type Product = {
    id: string;
    name: string;
    price: number
}