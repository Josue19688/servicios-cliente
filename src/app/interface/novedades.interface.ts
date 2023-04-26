export interface NovedadesResponse {
    ok:        boolean;
    total:     number;
    novedades: Novedade[];
}

export interface Novedade {
    id:           number;
    tipo:         string;
    hora:         string;
    fecha:        Date;
    puesto:       string;
    preliminar:   string;
    descripcion:  string;
    imagen?:      string;
    createdAt:    Date;
    updatedAt:    Date;
    T01UsuarioId: number;
}



export interface NewNovedadesResponse {
    ok:       boolean;
    insertar: Insertar;
}

export interface Insertar {
    id:           number;
    tipo:         string;
    hora:         string;
    fecha:        Date;
    puesto:       string;
    preliminar:   string;
    descripcion:  string;
    T01UsuarioId: number;
    updatedAt:    Date;
    createdAt:    Date;
}

export interface UpdateNovedadResponse {
    ok:      boolean;
    novedad: number[];
}

