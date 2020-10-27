export interface IDatosEscalaDeCalificacion{
    IdEscalaDeCalificacion: number;
    TxtEscalaDeCalificacion: string;
    DblPunteo: number;
    TxtDescripcion: string;
    FechaIngreso: string;
}

export class DatosEscalaDeCalificacion implements IDatosEscalaDeCalificacion{
    IdEscalaDeCalificacion: number;
    TxtEscalaDeCalificacion: string;
    DblPunteo: number;
    TxtDescripcion: string;
    FechaIngreso: string;

    constructor(){
        this.IdEscalaDeCalificacion = 0;
        this.TxtEscalaDeCalificacion = '';
        this.DblPunteo = 0;
        this.TxtDescripcion = '';
        this.FechaIngreso = '';
    }
}

export interface IActualizarAgregarEscalaDeCalificacion{
    IdEscalaDeCalificacion: number;
    TxtEscalaDeCalificacion: string;
    DblPunteo: number;
    TxtDescripcion: string;
    TxtToken: string;
}

export class ActualizarAgregarEscalaDeCalificacion implements IActualizarAgregarEscalaDeCalificacion{
    IdEscalaDeCalificacion: number;
    TxtEscalaDeCalificacion: string;
    DblPunteo: number;
    TxtDescripcion: string;
    TxtToken: string;

    constructor(){
        this.IdEscalaDeCalificacion = 0;
        this.TxtEscalaDeCalificacion = '';
        this.DblPunteo = 0;
        this.TxtDescripcion = '';
        this.TxtToken = '';
    }
}