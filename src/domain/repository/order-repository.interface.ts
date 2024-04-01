import Order from "../entity/order";
import OrderItem from "../entity/order_itens";
import RepositoryInterface from "./repository-interface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {
    // Este método foi criado apenas para testar meus conhecimentos sobre repository e criar
    // metodos personalizados por repository especificos, como foi este caso. 
    // Não que faça sentido adicionar novos itens para uma ordem que técnicamente já está feita. 
    increaseItemInOrder(item: OrderItem, orderId: string): Promise<void>;
}