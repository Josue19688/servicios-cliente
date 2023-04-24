import { environment } from "src/environments/environments";


const base_url = environment.base_url;
export class Usuario{
    constructor(
        public id:         number,
        public nombre:     string,
        public correo:     string,
        public contrasena?: string,
        public activo?:     boolean,
        public imagen?:     string,
        public token?:      null,
        public unidad?:     string,
        public rol?:        string,
        public createdAt?:  Date,
        public updatedAt?:  Date,
    ){}

    get imagenUrl(){
        return `${base_url}uploads/archivo/usuario/${this.id}/${this.imagen}`;
    }
}