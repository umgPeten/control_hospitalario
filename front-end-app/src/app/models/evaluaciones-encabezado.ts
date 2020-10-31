export interface IDatosEvaluacionEncabezado{
    IdEvaluacionEncabezado: number;
    TxtTipoDeEvaluacion: string;
    Anio: number;
    FechaIngreso: string;
}

export class DatosEvaluacionEncabezado implements IDatosEvaluacionEncabezado{
    IdEvaluacionEncabezado: number;
    TxtTipoDeEvaluacion: string;
    Anio: number;
    FechaIngreso: string;

    constructor(){
        this.IdEvaluacionEncabezado = 0;
        this.TxtTipoDeEvaluacion = '';
        this.Anio = 0;
        this.FechaIngreso = '';
    }
}

export interface IActualizarAgregarEvaluacionEncabezado{
    IdEvaluacionEncabezado: number;
    IdTipoDeEvaluacion: number;
    Anio: number;
    TxtToken: string;
}

export class ActualizarAgregarEvaluacionEncabezado implements IActualizarAgregarEvaluacionEncabezado{
    IdEvaluacionEncabezado: number;
    IdTipoDeEvaluacion: number;
    Anio: number;
    TxtToken: string;

    constructor(){
        this.IdEvaluacionEncabezado = 0;
        this.IdTipoDeEvaluacion = 0;
        this.Anio = 0;
        this.TxtToken = '';
    }
}