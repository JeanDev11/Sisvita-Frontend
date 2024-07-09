export interface Usuario {
    usuario_id: number;
    nombres: string;
    apellidos: string;
    fecha_nac: string;
    sexo: string;
    telefono: string;
    ubigeo?: {
        id_ubigeo: number;
        departamento: string;
        latitud: number;
        longitud: number
    };
}
