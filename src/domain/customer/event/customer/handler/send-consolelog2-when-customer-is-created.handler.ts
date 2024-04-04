import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import EventInterface from "../../../../@shared/event/event.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog2WhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {

    handler(event: CustomerCreatedEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated - ${event.eventData.name}`);
    }

}