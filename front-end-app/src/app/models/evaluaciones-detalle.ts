export interface IDatosEvaluacionDetalle{
    IdEvaluacionDetalle: number;
    TxtTipoDeEvaluacion: string;
    TxtFactor: string;
    TxtSubFactor: string;
    Anio: number;
    FechaIngreso: string;
}

export class DatosEvaluacionDetalle implements IDatosEvaluacionDetalle{
    IdEvaluacionDetalle: number;
    TxtTipoDeEvaluacion: string;
    TxtFactor: string;
    TxtSubFactor: string;
    Anio: number;
    FechaIngreso: string;

    constructor(){
        this.IdEvaluacionDetalle = 0;
        this.TxtTipoDeEvaluacion = '';
        this.TxtFactor = '';
        this.TxtSubFactor = '';
        this.Anio = 0;
        this.FechaIngreso = '';
    }
}

export interface IActualizarAgregarEvaluacionDetalle{
    IdEvaluacionDetalle: number;
    IdEvaluacionEncabezado: number;
    IdFactor: number;
    IdSubFactor: number;
    TxtToken: string;
}

export class ActualizarAgregarEvaluacionDetalle implements IActualizarAgregarEvaluacionDetalle{
    IdEvaluacionDetalle: number;
    IdEvaluacionEncabezado: number;
    IdFactor: number;
    IdSubFactor: number;
    TxtToken: string;

    constructor(){
        this.IdEvaluacionDetalle = 0;
        this.IdEvaluacionEncabezado = 0;
        this.IdFactor = 0;
        this.IdSubFactor = 0;
        this.TxtToken = '';
    }
}