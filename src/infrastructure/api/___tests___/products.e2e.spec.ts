import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for products", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product created by API",
                price: 12.3
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product created by API");
        expect(response.body.price).toBe(12.3);

    });

    it("should not create a product with price lower 0", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product created by API",
                price: 0
            });

        expect(response.status).toBe(500);
        // expect(response.body.name).toBe("Product created by API");
        // expect(response.body.price).toBe(12.3);

    });

    it("should find a product", async () => {
        const response1 = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product created by API",
                price: 12.3
            });

        expect(response1.status).toBe(200);
        expect(response1.body.name).toBe("Product created by API");
        expect(response1.body.price).toBe(12.3);

        const resp = await request(app)
            .get(`/product/${response1.body.id}`)
            .send();

        expect(resp.status).toBe(200);
        expect(resp.body.id).toBeDefined();
        expect(resp.body.name).toBe("Product created by API");
    });

    it("should return a list of products", async () => {
        const response1 = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product created by API 1",
                price: 12.3
            });

        expect(response1.status).toBe(200);
        expect(response1.body.name).toBe("Product created by API 1");
        expect(response1.body.price).toBe(12.3);

        const response2 = await request(app)
            .post("/product")
            .send({
                type: "b",
                name: "Product created by API 2",
                price: 14.5
            });

        expect(response2.status).toBe(200);
        expect(response2.body.name).toBe("Product created by API 2");
        // Tem uma regra para o produto "b" que multiplica o price por 2
        expect(response2.body.price).toBe(29);

        const resp = await request(app)
            .get(`/product`)
            .send();

        expect(resp.status).toBe(200);
        expect(resp.body.products.length).toBe(2);

        expect(resp.body.products[0].id).toBeDefined();
        expect(resp.body.products[0].name).toBe("Product created by API 1");
        expect(resp.body.products[0].price).toBe(12.3);

        expect(resp.body.products[1].id).toBeDefined();
        expect(resp.body.products[1].name).toBe("Product created by API 2");
        // Tem uma regra para o produto "b" que multiplica o price por 2
        expect(resp.body.products[1].price).toBe(29);

    });
});