export interface Paciente {
    paciente_id?: number;
    nombres: string;
    apellidos: string;
    correo_electronico: string;
    contrasena: string;
    rol: string;
    es_paciente: boolean;
    telefono: string;
    dni: string;
    fecha_nac: string;
    sexo: string;
    ciclo: number;
    facultad: string;
    carrera: string;
    id_ubigeo: number;
}
