import { environment } from "src/environments/environments";

const base_url = environment.base_url;
export class Visita{
    constructor(
        public id:           number,
        public tipo:         string,
        public puesto:       string,
        public nombre:       string,
        public dpi:          string,
        public colaborador:  string,
        public proveniente:  string,
        public ingreso:      string,
        public salida:       string,
        public placa:        string,
        public vehiculo:     string,
        public T01UsuarioId: number,
        public updatedAt:    Date,
        public createdAt:    Date,
        public imagen?:      string,
    ){}

    get imagenUrl(){
        return `${base_url}uploads/archivo/visita/${this.id}/${this.imagen}`;
    }


}