
export interface IDatosServicios{
    IdServicio:  number;
    TxtServicio: string;
    FechaIngreso: string;
}

export class DatosServicios implements IDatosServicios{
    IdServicio:  number;
    TxtServicio: string;
    FechaIngreso: string;

    constructor(){
        this.IdServicio = 0;
        this.TxtServicio = '';
        this.FechaIngreso = '';
    }
}

export interface IAgregarActualizarServicio{
    IdServicio:  number;
    TxtServicio: string;
    TxtToken:    string
}

export class AgregarActualizarServicios implements IAgregarActualizarServicio{
    IdServicio:  number;
    TxtServicio: string;
    TxtToken: string;

    constructor(){
        this.IdServicio = 0;
        this.TxtServicio = '';
        this.TxtToken = '';
    }
}
