

export class Registro{
    constructor(
        public id           : number,
        public codigo       : string,
        public status       : boolean,
        public createdAt    : Date,
        public updateAt     : Date,
        public T01UsuarioId : number,
    ){}
}