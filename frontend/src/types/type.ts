export interface SuccessResponse<T> {
    data?: T;
    message: string;
    error: true;
}

export interface AuthSession {
    user:    User;
    expires: Date;
}

export interface User {
    id:          string;
    accessToken: string;
    apellido:    string;
    rango:       string;
}
