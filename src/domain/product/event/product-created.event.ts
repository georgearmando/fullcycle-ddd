import { EventInterface } from "../../@shared/event/event.interface";

export class ProductCreatedEvent implements EventInterface {
  dataTimeOuccurred: Date;
  eventData: any;
  
  constructor(eventDate: any) {
    this.dataTimeOuccurred = new Date();
    this.eventData = eventDate;
  }
}