export interface CrearVehiculoResponse {
    ok:       boolean;
    vehiculo: Vehiculo;
}



export interface GetVehiculoResponse {
    ok:        boolean;
    total:     number;
    vehiculos: Vehiculo[];
}

export interface Vehiculo {
    id:           number;
    piloto:       string;
    vehiculo:     string;
    kmsalida:     string;
    kmingreso:    null;
    status:       boolean;
    csalida:      string;
    cingreso:     null;
    sede:         null;
    createdAt:    Date;
    updatedAt:    Date;
    T01UsuarioId: number;
}

export interface DeleteVehiculoResponse {
    ok:  boolean;
    msg: Msg;
}

export interface Msg {
    id:           number;
    piloto:       string;
    vehiculo:     string;
    kmsalida:     string;
    kmingreso:    null;
    status:       boolean;
    csalida:      string;
    cingreso:     null;
    sede:         null;
    createdAt:    Date;
    updatedAt:    Date;
    T01UsuarioId: number;
}

export interface UpdateVehiculoResponse {
    ok:  boolean;
    msg: Msg;
}





