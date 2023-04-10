export interface NovedadesResponse {
    ok:      boolean;
    total:   number;
    novedad: Novedad[];
}

export interface Novedad {
    tipo:        string;
    hora:        string;
    fecha:       Date;
    puesto:      string;
    preliminar:  string;
    descripcion: string;
    images:      any[];
    createdAt:   Date;
    updatedAt:   Date;
    uid:         string;
}



export interface NewNovedadesResponse {
    ok:      boolean;
    novedad: Novedad;
}

