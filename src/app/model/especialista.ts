export interface Especialista {
    especialista_id?: number;
    nombres: string;
    apellidos: string;
    correo_electronico: string;
    contrasena: string;
    rol: string; // CHAR(1) should be replaced with string
    es_paciente: boolean;
    telefono: string;
    fecha_nac: string; // Ensure the date format is consistent, e.g., "YYYY-MM-DD"
    sexo: string; // CHAR(1) should be replaced with string
    especialidad: string;
    nro_colegiado: number;
    direccion_consultorio: string;
}

