
import { environment } from "src/environments/environments";


const base_url = environment.base_url;

export class Agente{
    constructor(
        public id:               number,
        public nombre:           string,
        public dpi:              string,
        public telefono:         string,
        public correo:           string,
        public nacimiento:       Date,
        public direccion:        string,
        public igss:             string,
        public nit:              string,
        public sangre:           string,
        public puesto:           string,
        public grupo:            string,
        public status:           string,
        public imagen?:           string |null,
        public licenciaarma?:     string |null,
        public licenciavehiculo?: string |null,
        public cv?:               string |null,
        public ficha?:            string |null,
        public createdAt?:        Date,
        public updatedAt?:        Date,
        public T01UsuarioId?:     number,
    ){}

    get imagenUrl(){
        return `${base_url}uploads/archivo/agente/${this.id}/${this.imagen}`;
    }
}
