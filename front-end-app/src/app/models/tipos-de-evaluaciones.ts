export interface IDatosTipoDeEvaluacion{
    IdTipoDeEvaluacion: number;
    TxtTipoDeEvaluacion: string;
    FechaIngreso: string;
}

export class DatosTipoDeEvaluacion implements IDatosTipoDeEvaluacion{
    IdTipoDeEvaluacion: number;
    TxtTipoDeEvaluacion: string;
    FechaIngreso: string;

    constructor(){
        this.IdTipoDeEvaluacion = 0;
        this.TxtTipoDeEvaluacion = '';
        this.FechaIngreso = '';
    }
}

export interface IActualizarAgregarTipoDeEvaluacion{
    IdTipoDeEvaluacion: number;
    TxtTipoDeEvaluacion: string;
    TxtToken: string;
}

export class ActualizarAgregarTipoDeEvaluacion implements IActualizarAgregarTipoDeEvaluacion{
    IdTipoDeEvaluacion: number;
    TxtTipoDeEvaluacion: string;
    TxtToken: string;

    constructor(){
        this.IdTipoDeEvaluacion = 0;
        this.TxtTipoDeEvaluacion = '';
        this.TxtToken = '';
    }
}