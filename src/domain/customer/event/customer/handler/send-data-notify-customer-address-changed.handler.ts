import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import EventInterface from "../../../../@shared/event/event.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendDataNotifyCustomerAddressChanged implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handler(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: 
id: ${event.eventData.id_customer} nome: ${event.eventData.name_customer}
Endereço antigo: ${event.eventData.address_customer_old.street} - ${event.eventData.address_customer_old.number} - ${event.eventData.address_customer_old.zipcode} - ${event.eventData.address_customer_old.city}
Alterado para: ${event.eventData.address_customer_atual.street} - ${event.eventData.address_customer_atual.number} - ${event.eventData.address_customer_atual.zipcode} - ${event.eventData.address_customer_atual.city}
    `);
    }

}