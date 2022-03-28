import { IPerson } from "./person";

export interface IEvent {
  organizerName: string,
  organizerEmail: string,
  eventName: string,
  endDate: Date | null,
  budget: number,
  message: string,
  persons: IPerson[]
}