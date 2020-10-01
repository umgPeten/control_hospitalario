export interface IDatosEspecialidades{
    IdEspecialidad: number;
    TxtEspecialidad: string;
    FechaIngreso: string;
}

export class DatosEspecialidades implements IDatosEspecialidades{
    IdEspecialidad: number;
    TxtEspecialidad: string;
    FechaIngreso: string;

    constructor(){
        this.IdEspecialidad = 0;
        this.TxtEspecialidad = '';
        this.FechaIngreso = '';
    }
}

export interface IAgregarActualizarespecialidad{
    IdEspecialidad: number;
    TxtEspecialidad: string;
    TxtToken: string;
}

export class AgregarActualizarEspecialidad implements IAgregarActualizarespecialidad{
    IdEspecialidad: number;
    TxtEspecialidad: string;
    TxtToken: string;

    constructor(){
        this.IdEspecialidad = 0;
        this.TxtEspecialidad = '';
        this.TxtToken = '';
    }
}