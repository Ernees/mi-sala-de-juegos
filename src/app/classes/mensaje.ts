import { Usuario } from "./usuario";

export class Mensaje {
    id?: number;
    created_at?: Date;
    mensaje?: string;
    registros?: Usuario;
}