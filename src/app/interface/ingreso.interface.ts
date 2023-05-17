export interface IngresoResponse {
    ok:  boolean;
    msg: Msg;
}

export interface Msg {
    id:           number;
    codigo:       string;
    status:       boolean;
    T01UsuarioId: number;
    updatedAt:    Date;
    createdAt:    Date;
}


export interface GetIngresoResponse {
    ok:       boolean;
    total:    number;
    ingresos: Ingreso[];
}

export interface Ingreso {
    id:           number;
    codigo:       string;
    status:       boolean;
    createdAt:    Date;
    updatedAt:    Date;
    T01UsuarioId: number;
}
