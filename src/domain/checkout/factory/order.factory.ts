import Order from "../entity/order";
import OrderItem from "../entity/order_itens";

export default interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: [
        {
            id: string;
            name: string;
            productId: string;
            quantity: number;
            price: number;
        }
    ]
}

export default class OrderFactory {
    public static create(orderProps: OrderFactoryProps): Order {
        const itemsOrder = orderProps.items.map((item) => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity));
        const order = new Order(orderProps.id, orderProps.customerId, itemsOrder)

        return order;
    }
}