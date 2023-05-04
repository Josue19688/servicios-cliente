


import { environment } from "src/environments/environments";

export class Vehiculo{
    constructor(
        public id:             number,
        public piloto:         string,
        public vehiculo:       string,
        public kmsalida:       string,
        public kmingreso:      string,
        public status:         boolean,
        public csalida:        string,
        public cingreso:       string,
        public sede:           string,
        public updatedAt:    Date,
        public createdAt:    Date,
        public T01UsuarioId: number
        
    ){}

}

