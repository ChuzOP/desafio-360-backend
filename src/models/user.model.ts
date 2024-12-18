export interface IUserRegister {
    rol_id: number;
    correo_electronico: string;
    nombre: string;
    password: string;
    telefono?: string;
    nombre_completo?: string;
    direccion?: string;
}

export interface IUserLogin {
    correo_electronico: string;
    password: string;
}