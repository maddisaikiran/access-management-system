import { User } from "./User";

export interface ContactForm {
    name: string;
    phone: number;
    email: string;
    message: string;
    user: User;
}