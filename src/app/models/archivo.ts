import { environment } from "src/environments/environments";


const base_url = environment.base_url;
export class Archivo{

    constructor(
        public id:           number,
        public tipo:         string,
        public numero:       string,
        public fecha:        string,
        public origen:       string,
        public unidad:       string,
        public descripcion:  string,
        public T01UsuarioId: number,
        public updatedAt:    Date,
        public createdAt:    Date,
        public imagen?:      string,
        public imagenes?:    string,
    ){}

    
    get imagenUrl(){
        return `${base_url}uploads/archivo/archivo/${this.id}/${this.imagen}`;
    }
}