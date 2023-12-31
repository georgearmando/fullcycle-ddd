import { EventDispatcherInterface } from "./event-dispatcher.interface";
import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if(!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventname: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if(this.eventHandlers[eventname]) {
      const index = this.eventHandlers[eventname].indexOf(eventHandler);
      if(index !== -1) {
        this.eventHandlers[eventname].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;

    if(this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach(eventHandler => {
        eventHandler.handle(event);
      })
    }
  }
  
}