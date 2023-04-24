
export interface NewArchivoInterface {
    ok:      boolean;
    archivo: Archivo;
}



export interface ArchivoResponse {
    ok:       boolean;
    total:    number;
    archivos: Archivo[];
}

export interface Archivo {
    id:           number;
    tipo:         string;
    numero:       string;
    fecha:        string;
    origen:       string;
    unidad:       string;
    descripcion:  string;
    imagen:       null;
    imagenes:     null;
    createdAt:    Date;
    updatedAt:    Date;
    T01UsuarioId: number;
}
