import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog1WhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {

    handler(event: CustomerCreatedEvent): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated - ${event.eventData.name}`);
    }

}