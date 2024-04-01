import Order from "./order";
import OrderItem from "./order_itens";

describe("Order unit tests", () => {
    
    it("Should throw error when id is empty", () => {
        expect(()=>{
            let order = new Order("", "123", []);
        }).toThrow("Id is required");
    });

    it("Should throw error when customerId is empty", () => {
        expect(()=>{
            let order = new Order("1", "", []);
        }).toThrow("Customer Id is required");
    });

    it("Should throw error when Itens is empty", () => {
        
        expect(()=>{
            let order = new Order("1", "123", []);
        }).toThrow("Item qtd must be greather than 0");

    });

    it("Should calculate total", () => {
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i1", "Item 1", 200, "p2", 2);
        const order = new Order("o1", "c1", [item]);

        let total = order.total();
        expect(total).toBe(200);

        const order2 = new Order("o1", "c1", [item, item2]);

        total = order2.total();

        expect(total).toBe(600);

        
    });

    it("Should check if the qtd is less or equal 0", () => {
        
        expect(()=>{
            const item = new OrderItem("i1", "Item 1", 100, "p1", -2);
            const order = new Order("o1", "c1", [item]);
        }).toThrow("Quantity less than zero");

        expect(()=>{
            const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
            const order = new Order("o1", "c1", [item]);
        }).toThrow("Quantity less than zero");

    });
  
});