import exp from "constants";
import Product from "./product";


describe("Product unit tests", () => {
    
    it("Should throw error when id is empty", () => {
        expect(()=>{
            let product = new Product("", "Product 1", 100);
        }).toThrow("product: Id is required");
    });

    it("Should throw error when name is empty", () => {
        expect(()=>{
            let product = new Product("1", "", 100);
        }).toThrow("product: Name is required");
    });

    it("Should throw error when price is less then zero", () => {
        expect(()=>{
            let product = new Product("123", "Product 1", -1);
        }).toThrow("product: Price must be greater thean zero");
    });

    it("Should throw error when price is less then zero or id and name is empty", () => {
        expect(()=>{
            let product = new Product("", "", -1);
        }).toThrow("product: Id is required,product: Name is required,product: Price must be greater thean zero");
    });

    it("Should change name", () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("Should change price", () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });
    

});