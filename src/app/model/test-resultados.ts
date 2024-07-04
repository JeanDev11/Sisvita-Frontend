export interface TestResultados {
    resultado_id?: number;
    test_id?: number;
    usuario_id?: number;
    puntaje_obtenido: number;
    id_nivel?: number; // Falata corregir para registar un test
    fecha_creacion?: string;
    test__rel?: {
        test_id: number;
        titulo: string;
    };
    nivel__rel?: {
        id_nivel: number;
        descripcion: string;
        semaforo: string;
    };
    usuario__rel?: {
        usuario_id: number;
        nombres: string;
        apellidos: string;
        correo_electronico: string;
    };
}

export interface TestResultadosImport {
    resultado_id: number;
    puntaje_obtenido: number;
    fecha_creacion: string;
    nivel__rel: {
        id_nivel: number;
        descripcion: string;
        semaforo: string;
    };
    test__rel: {
        test_id: number;
        titulo: string;
    };
    usuario__rel: {
        apellidos: string;
        correo_electronico: string;
        dni: string;
        nombres: string;
        usuario_id: number;
        ubigeo: {
            id_ubigeo: number;
            departamento: string;
            latitud: number;
            longitud: number
        };
    };
}