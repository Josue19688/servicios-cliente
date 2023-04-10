export interface UsuarioResponse {
    ok:       boolean;
    insertar: Usuario;
}





export interface UsuarioGetResponse {
    ok:       boolean;
    usuarios: Usuario[];
    total:number;
}

export interface Usuario {
    id:        number;
    nombre:    string;
    correo:    string;
    activo:    boolean;
    imagen:    null | string;
    token?:     null;
    unidad:    string;
    rol:       string;
    createdAt: Date;
    updatedAt: Date;
}


