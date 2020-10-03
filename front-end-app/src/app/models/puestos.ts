export interface IDatosPuestos{
    IdPuesto: number;
    TxtPuesto: string;
    FechaIngreso: string;
}

export class DatosPuestos implements IDatosPuestos{
    IdPuesto: number;
    TxtPuesto: string;
    FechaIngreso: string;

    constructor(){
        this.IdPuesto = 0;
        this.TxtPuesto = '';
        this.FechaIngreso = '';
    }
}

export interface IAgregarActualizarPuesto{
    IdPuesto: number;
    TxtPuesto: string;
    TxtToken: string;
}

export class AgregarActualizarPuesto implements IAgregarActualizarPuesto{
    IdPuesto: number;
    TxtPuesto: string;
    TxtToken: string;

    constructor(){
        this.IdPuesto = 0;
        this.TxtPuesto = '';
        this.TxtToken = '';
    }
}