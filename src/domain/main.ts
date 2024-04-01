import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_itens";

let customer = new Customer("123", "Alexsander")
const address = new Address("Rua 1", 2, "74140-050", "Goiânia");
// customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "item 1", 10, "p1");
const item2 = new OrderItem("2", "item 2", 15, "p2");

const order = new Order("1", "123", [item1, item2]);