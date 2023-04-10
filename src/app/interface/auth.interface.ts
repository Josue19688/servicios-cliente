export interface AuthResponse {
    response: Response;
}

export interface Response {
    ok:    boolean;
    user:  User;
    token: string;
}

export interface User {
    id:         number;
    nombre:     string;
    correo:     string;
    contrasena?: string;
    activo:     boolean;
    imagen?:     string;
    token?:      null;
    unidad:     string;
    rol:        string;
    createdAt:  Date;
    updatedAt:  Date;
}
