export interface CrearAgenteResponse {
    ok:        boolean;
    respuesta: Respuesta;
}


export interface ActualizarAgenteResponse {
    ok:        boolean;
    respuesta: Respuesta;
}
export interface DeleteAgenteResponse {
    ok:        boolean;
    respuesta: Respuesta;
}


export interface Respuesta {
    id:               number;
    nombre:           string;
    dpi:              string;
    telefono:         string;
    correo:           string;
    nacimiento:       Date;
    direccion:        string;
    igss:             string;
    nit:              string;
    sangre:           string;
    puesto:           string;
    grupo:            string;
    status:           string;
    imagen:           null;
    licenciaarma:     null;
    licenciavehiculo: null;
    cv:               null;
    ficha:            null;
    createdAt:        Date;
    updatedAt:        Date;
    T01UsuarioId:     number;
}

export interface ObtenerAgenteResponse {
    ok:              boolean;
    totalActivos:    number;
    activos:         Activo[];
    totalSupendidos: number;
    suspendidos:     Activo[];
    totalBaja:       number;
    baja:            Activo[];
}

export interface Activo {
    id:               number;
    nombre:           string;
    dpi:              string;
    telefono:         string;
    correo:           string;
    nacimiento:       Date;
    direccion:        string;
    igss:             string;
    nit:              string;
    sangre:           string;
    puesto:           string;
    grupo:            string;
    status:           string;
    imagen:           null;
    licenciaarma:     null;
    licenciavehiculo: null;
    cv:               null;
    ficha:            null;
    createdAt:        Date;
    updatedAt:        Date;
    T01UsuarioId:     number;
}




// export interface Respuesta {
//     id:           number;
//     nombre:       string;
//     dpi:          string;
//     telefono:     string;
//     correo:       string;
//     nacimiento:   Date;
//     direccion:    string;
//     igss:         string;
//     nit:          string;
//     sangre:       string;
//     puesto:       string;
//     grupo:        string;
//     status:       string;
//     T01UsuarioId: number;
//     updatedAt:    Date;
//     createdAt:    Date;
// }