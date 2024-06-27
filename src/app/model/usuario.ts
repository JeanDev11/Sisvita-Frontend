export interface Usuario {
    usuario_id: number;
    nombres: string;
    apellidos: string;
    ubigeo?: {
        id_ubigeo: number;
        departamento: string;
        latitud: number;
        longitud: number
    };
}
