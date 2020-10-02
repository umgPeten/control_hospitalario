export interface IDatosRenglones{
    IdRenglon: number;
	TxtRenglon: string;
	FechaIngreso: string;
}

export class DatosRenglones implements IDatosRenglones{
    IdRenglon: number;
	TxtRenglon: string;
    FechaIngreso: string;
    
    constructor(){
        this.IdRenglon = 0;
	    this.TxtRenglon = '';
	    this.FechaIngreso = '';
    }
}

export interface IAgregarActualizarRenglon{
    IdRenglon: number;
    TxtRenglon: string;
    TxtToken: string;
}

export class AgregarActualizarRenglon implements IAgregarActualizarRenglon{
    IdRenglon: number;
    TxtRenglon: string;
    TxtToken: string;

    constructor(){
        this.IdRenglon = 0;
        this.TxtRenglon = '';
        this.TxtToken = '';
    }
}

