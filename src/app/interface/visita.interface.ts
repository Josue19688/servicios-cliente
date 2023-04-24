export interface VisitaResponse {
    ok:      boolean;
    total:   number;
    visitas: Visita[];
}

export interface Visita {
    id:           number;
    tipo:         string;
    puesto:       string;
    nombre:       string;
    dpi:          string;
    colaborador:  string;
    proveniente:  string;
    ingreso:      string;
    salida:       string;
    placa:        string;
    vehiculo:     string;
    imagen?:      string;
    createdAt:    Date;
    updatedAt:    Date;
    T01UsuarioId: number;
}


/**
 * Crear Visita
 */
export interface NewVisitaResponse {
    ok:        boolean;
    respuesta: Respuesta;
}

export interface Respuesta {
    id:           number;
    tipo:         string;
    nombre:       string;
    dpi:          string;
    colaborador:  string;
    proveniente:  string;
    ingreso:      string;
    salida:       string;
    placa:        string;
    vehiculo:     string;
    T01UsuarioId: number;
    updatedAt:    Date;
    createdAt:    Date;
}



export interface UpdateVisitaResponse {
    ok:     boolean;
    visita: number[];
}
