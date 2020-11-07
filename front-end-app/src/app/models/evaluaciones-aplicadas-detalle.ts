export interface IDatosEvaluacionAplicadaDetalle {
    DblPunteo: number;
    DblPunteoTotal: number;
    TxtEmpleado: string;
    TxtEvaluacionEncabezado: string;
    TxtFactor: string;
    IdEvaluacionAplicadaDetalle: number;
    IdEvaluacionAplicadaEncabezado: number;
    IdEvaluacionDetalle: number;
    TxtEscalaDeCalificacion: string;
    TxtUsuario: string;
    FechaIngreso: string;
}

export class DatosEvaluacionAplicadaDetalle implements IDatosEvaluacionAplicadaDetalle{
    DblPunteo: number;
    DblPunteoTotal: number;
    TxtEmpleado: string;
    TxtEvaluacionEncabezado: string;
    TxtFactor: string;
    IdEvaluacionAplicadaDetalle: number;
    IdEvaluacionAplicadaEncabezado: number;
    IdEvaluacionDetalle: number;
    TxtEscalaDeCalificacion: string;
    TxtUsuario: string;
    FechaIngreso: string;

    constructor(){
        this.DblPunteo = 0;
        this.DblPunteoTotal = 0;
        this.TxtEmpleado = '';
        this.TxtEvaluacionEncabezado = '';
        this.TxtFactor = '';
        this.IdEvaluacionAplicadaDetalle = 0;
        this.IdEvaluacionAplicadaEncabezado = 0;
        this.IdEvaluacionDetalle = 0;
        this.TxtEscalaDeCalificacion = '';
        this.TxtUsuario = '';
        this.FechaIngreso = '';
    }
}


export interface IActualizarAgregarEvaluacionAplicadaDetalle{
    IdEvaluacionAplicadaDetalle: number;
    IdEvaluacionAplicadaEncabezado: number;
    IdEvaluacionDetalle: number;
    IdEscalaDeCalificacion: number;
    TxtToken: string;
}

export class ActualizarAgregarEvaluacionAplicadaDetalle implements IActualizarAgregarEvaluacionAplicadaDetalle{
    IdEvaluacionAplicadaDetalle: number;
    IdEvaluacionAplicadaEncabezado: number;
    IdEvaluacionDetalle: number;
    IdEscalaDeCalificacion: number;
    TxtToken: string;

    constructor(){
        this.IdEvaluacionAplicadaDetalle = 0;
        this.IdEvaluacionAplicadaEncabezado = 0;
        this.IdEvaluacionDetalle = 0;
        this.IdEscalaDeCalificacion = 0;
        this.TxtToken = '';
    }
}