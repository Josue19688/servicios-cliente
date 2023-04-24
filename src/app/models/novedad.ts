import { environment } from "src/environments/environments";

const base_url = environment.base_url;

export class Novedad{

    constructor(
        public id :number,
        public tipo :string, 
        public hora :string, 
        public fecha :Date, 
        public puesto :string, 
        public preliminar :string,
        public descripcion :string, 
        public T01UsuarioId :string,
        public updatedAt :Date, 
        public createdAt :Date,
        public imagen?:  string,
    ){}



    get imagenUrl(){
        return `${base_url}uploads/archivo/novedad/${this.id}/${this.imagen}`;
    }
}