export interface IDatosFactores{
    IdFactor: number;
    TxtFactor: string;
    TxtDescripcion: string;
    FechaIngreso: string;
}

export class DatosFactores implements IDatosFactores{
    IdFactor: number;
    TxtFactor: string;
    TxtDescripcion: string;
    FechaIngreso: string;

    constructor(){
        this.IdFactor = 0;
        this.TxtFactor = '';
        this.TxtDescripcion = '';
        this.FechaIngreso = '';
    }
}

export interface IActualizarAgregarFactores{
    IdFactor: number;
    TxtFactor: string;
    TxtDescripcion: string;
    TxtToken: string;
}

export class ActualizarAgregarFactores{
    IdFactor: number;
    TxtFactor: string;
    TxtDescripcion: string;
    TxtToken: string;

    constructor(){
        this.IdFactor = 0;
        this.TxtFactor = '';
        this.TxtDescripcion = '';
        this.TxtToken = '';
    }
}