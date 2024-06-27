export interface TestResultados {
    resultado_id?: number;
    test_id?: number;
    usuario_id?: number;
    puntaje_obtenido: number;
    id_nivel?: number; // Falata corregir para registar un test
    fecha_creacion?: string;
    test?: {
        test_id: number;
        titulo: string;
    };
    nivel?: {
        id_nivel: number;
        descripcion: string;
        semaforo: string;
    };
    usuario?: {
        usuario_id: number;
        nombres: string;
        apellidos: string;
    };
}
