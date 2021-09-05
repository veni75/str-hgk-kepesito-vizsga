import { Classroom } from "./classroom";

export interface Student {
  _id?:string;
  firstName: string;
  lastName: string;
  email: string;
  classroom: Classroom;
}
