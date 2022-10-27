import { IPerson } from "./person";

export interface IEvent {
  id?: string;
  organizerName: string,
  organizerEmail: string | null,
  name: string,
  endDate: Date | null,
  budget: number,
  message: string,
  persons?: IPerson[]
}