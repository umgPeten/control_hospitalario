export interface IDatosEvaluacionAplicadaEncabezado {
    IdEvaluacionAplicadaEncabezado: number;
    TxtInstitucion: string;
    TxtTipoDeEvaluacion: string;
    TxtEmpleado: string;
    FechaDeAplicacion: string;
    FechaInicial: string;
    FechaFinal: string;
    DblPunteoTotal: number;
    TxtObservacionesDeJefe: string;
    TxtObservacionesDelEmpleado: string;
    IntNecesitaPlanDeMejora: number;
    TxtUsuario: string;
    FechaIngreso: string;
}

export class DatosEvaluacionAplicadaEncabezado implements IDatosEvaluacionAplicadaEncabezado{
    IdEvaluacionAplicadaEncabezado: number;
    TxtInstitucion: string;
    TxtTipoDeEvaluacion: string;
    TxtEmpleado: string;
    FechaDeAplicacion: string;
    FechaInicial: string;
    FechaFinal: string;
    DblPunteoTotal: number;
    TxtObservacionesDeJefe: string;
    TxtObservacionesDelEmpleado: string;
    IntNecesitaPlanDeMejora: number;
    TxtUsuario: string;
    FechaIngreso: string;

    constructor(){
        this.IdEvaluacionAplicadaEncabezado = 0;
        this.TxtInstitucion = '';
        this.TxtTipoDeEvaluacion = '';
        this.TxtEmpleado = '';
        this.FechaDeAplicacion = '';
        this.FechaInicial = '';
        this.FechaFinal = '';
        this.DblPunteoTotal = 0;
        this.TxtObservacionesDeJefe = '';
        this.TxtObservacionesDelEmpleado = '';
        this.IntNecesitaPlanDeMejora = 0;
        this.TxtUsuario = '';
        this.FechaIngreso = '';
    }
}


export interface IActualizarAgregarEvaluacionAplicadaEncabezado{
    IdEvaluacionAplicadaEncabezado: number;
    IdInstitucion: number;
    IdEvaluacionEncabezado: number;
    IdEmpleado: number;
    FechaDeAplicacion: string;
    FechaInicial: string;
    FechaFinal: string;
    DblPunteoTotal: number;
    TxtObservacionesDeJefe: string;
    TxtObservacionesDelEmpleado: string;
    IntNecesitaPlanDeMejora: number;
    TxtToken: string;
}

export class ActualizarAgregarEvaluacionAplicadaEncabezado implements IActualizarAgregarEvaluacionAplicadaEncabezado{
    IdEvaluacionAplicadaEncabezado: number;
    IdInstitucion: number;
    IdEvaluacionEncabezado: number;
    IdEmpleado: number;
    FechaDeAplicacion: string;
    FechaInicial: string;
    FechaFinal: string;
    DblPunteoTotal: number;
    TxtObservacionesDeJefe: string;
    TxtObservacionesDelEmpleado: string;
    IntNecesitaPlanDeMejora: number;
    TxtToken: string;

    constructor(){
        this.IdEvaluacionAplicadaEncabezado = 0;
        this.IdInstitucion = 0;
        this.IdEvaluacionEncabezado = 0;
        this.IdEmpleado = 0;
        this.FechaDeAplicacion = '';
        this.FechaInicial = '';
        this.FechaFinal = '';
        this.DblPunteoTotal = 0;
        this.TxtObservacionesDeJefe = '';
        this.TxtObservacionesDelEmpleado = '';
        this.IntNecesitaPlanDeMejora = 0;
        this.TxtToken = '';
    }
}