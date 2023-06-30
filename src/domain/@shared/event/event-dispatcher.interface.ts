import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  unregister(eventname: string, eventHandler: EventHandlerInterface): void;
  unregisterAll(): void; 
}