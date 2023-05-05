


import { environment } from "src/environments/environments";

export class Vehiculo{
    constructor(
        public id:             number,
        public piloto:         string,
        public vehiculo:       string,
        public kmsalida:       string,
        public kmingreso:      string | null,
        public status:         boolean,
        public csalida:        string,
        public cingreso:       string | null,
        public sede:           string | null,
        public updatedAt:    Date,
        public createdAt:    Date,
        public T01UsuarioId: number
        
    ){}

}

