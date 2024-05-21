export interface InputUpdateProductDto {
    type: string,
    id: string,
    name: string,
    price: number,
}

export interface OutputUpdateProductDto {
    id: string,
    name: string,
    price: number,
    type: string,
}