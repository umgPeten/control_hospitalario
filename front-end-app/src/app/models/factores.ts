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

export class ActualizarAgregarFactores implements IActualizarAgregarFactores{
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

export interface IDatosSubFactores{
    IdSubFactor: number;
    IdFactor: number;
    TxtSubFactor: string;
    TxtDescripcion: string;
    FechaIngreso: string;
}

export class DatosSubFactores implements IDatosSubFactores{
    IdSubFactor: number;
    IdFactor: number;
    TxtSubFactor: string;
    TxtDescripcion: string;
    FechaIngreso: string;

    constructor(){
        this.IdSubFactor = 0;
        this.IdFactor = 0;
        this.TxtSubFactor = '';
        this.TxtDescripcion = '';
        this.FechaIngreso = '';
    }
}

export interface IActualizarAgregarSubFactores{
    IdSubFactor: number;
    IdFactor: number;
    TxtSubFactor: string;
    TxtDescripcion: string;
    TxtToken: string;
}

export class ActualizarAgregarSubFactores implements IActualizarAgregarSubFactores{
    IdSubFactor: number;
    IdFactor: number;
    TxtSubFactor: string;
    TxtDescripcion: string;
    TxtToken: string;

    constructor(){
        this.IdSubFactor = 0;
        this.IdFactor = 0;
        this.TxtSubFactor = '';
        this.TxtDescripcion = '';
        this.TxtToken = '';
    }
}