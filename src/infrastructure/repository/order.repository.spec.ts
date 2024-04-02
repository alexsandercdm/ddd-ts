import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProdudctModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_itens";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";


describe("Order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProdudctModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("shoul create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");

        customer.Address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2,
        );

        const order = new Order("123", "123", [ordemItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    product_id: ordemItem.productId,
                    price: ordemItem.price,
                    quantity: ordemItem.quantity,
                    order_id: "123",
                },
            ]
        });
    });

    it("should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");

        customer.Address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2,
        );

        const order = new Order("123", "123", [ordemItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find("123");

        expect(foundOrder).toStrictEqual(order);
    });

    it("should not found a order", async () => {

        const orderRepository = new OrderRepository();

        expect(async () => {
            let order = await orderRepository.find("4569ABC");
        }).rejects.toThrow("Order Not found");
    });


    it("should find all order", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "Customer 1");

        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer1.Address = address;
        await customerRepository.create(customer1);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const ordemItem1 = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2,
        );

        const ordemItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            2,
        );

        const ordemItem3 = new OrderItem(
            "3",
            product.name,
            product.price,
            product.id,
            2,
        );

        const order1 = new Order("123", "123", [ordemItem1]);
        const order2 = new Order("456", "123", [ordemItem2]);
        const order3 = new Order("789", "123", [ordemItem3]);

        const orders = [order1, order2, order3];

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);
        await orderRepository.create(order3);

        const foundOrder = await orderRepository.findAll();

        expect(foundOrder).toStrictEqual(orders);
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");

        customer.Address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const ordemItem1 = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2,
        );

        let order = new Order("123", "123", [ordemItem1]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: ordemItem1.id,
                    name: ordemItem1.name,
                    product_id: ordemItem1.productId,
                    price: ordemItem1.price,
                    quantity: ordemItem1.quantity,
                    order_id: "123",
                },
            ]
        });

        const ordemItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            3,
        );

        order.items.push(ordemItem2);

        const updateOrder = await orderRepository.update(order);
        const orderResult = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        console.log(orderResult.toJSON());

        expect(orderResult.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: ordemItem1.id,
                    name: ordemItem1.name,
                    product_id: ordemItem1.productId,
                    price: ordemItem1.price,
                    quantity: ordemItem1.quantity,
                    order_id: order.id,
                },
                {
                    id: ordemItem2.id,
                    name: ordemItem2.name,
                    product_id: ordemItem2.productId,
                    price: ordemItem2.price,
                    quantity: ordemItem2.quantity,
                    order_id: order.id,
                },
            ]
        });
    });

});

