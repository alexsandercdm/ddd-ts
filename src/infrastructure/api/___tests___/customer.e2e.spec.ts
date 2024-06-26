import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "123490",
                }
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("123490");

    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
            });
        expect(response.status).toBe(500);
    });

    it("should list allcustomer", async () => {
        const response1 = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "123490",
                }
            });
        expect(response1.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Jane",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "123490",
                }
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("John");
        expect(customer.address.street).toBe("Street");

        const customer1 = listResponse.body.customers[1];
        expect(customer1.name).toBe("Jane");
        expect(customer1.address.street).toBe("Street");
    });

    it("should return a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "123490",
                }
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("123490");

        const customer = await request(app)
            .get(`/customer/${response.body.id}`)
            .send();

        expect(customer.status).toBe(200);
        expect(customer.body.id).toBeDefined();
        expect(customer.body.name).toBe("John");
        expect(customer.body.address.street).toBe("Street");
        expect(customer.body.address.city).toBe("City");
        expect(customer.body.address.number).toBe(123);
        expect(customer.body.address.zip).toBe("123490");


        const listResponseXML = await request(app)
            .get('/customer')
            .set("Accept", "application/xml")
            .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>John</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>Street</street>`);
        expect(listResponseXML.text).toContain(`<city>City</city>`);
        expect(listResponseXML.text).toContain(`<number>123</number>`);
        expect(listResponseXML.text).toContain(`<zip>123490</zip>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);

    });

});