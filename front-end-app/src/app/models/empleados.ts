export interface IDatosEmpleado{
    IdEmpleado: number;
    TxtNit: string;
    TxtDpi: string;
    TxtNombres: string;
    TxtApellidos: string;
    TxtPuesto: string;
    TxtEspecialidad: string;
    TxtServicio: string;
    TxtRegion: string;
    TxtInstitucion: string;
    FechaIngreso: string;
    EstadoToken: string;
}

export class DatosEmpleado implements IDatosEmpleado{
    IdEmpleado: number;
    TxtNit: string;
    TxtDpi: string;
    TxtNombres: string;
    TxtApellidos: string;
    TxtPuesto: string;
    TxtEspecialidad: string;
    TxtServicio: string;
    TxtRegion: string;
    TxtInstitucion: string;
    FechaIngreso: string;
    EstadoToken: string;

    constructor(){
        this.IdEmpleado = 0;
        this.TxtNit = '';
        this.TxtDpi = '';
        this.TxtNombres = '';
        this.TxtApellidos = '';
        this.TxtPuesto = '';
        this.TxtEspecialidad = '';
        this.TxtServicio = '';
        this.TxtRegion = '';
        this.TxtInstitucion = '';
        this.FechaIngreso = '';
        this.EstadoToken = '';
    }
}

export interface IActualizarAgregarEmpleado {
    IdEmpleado: number;
    TxtNit: string;
    TxtDpi: string;
    TxtNombres: string;
    TxtApellidos: string;
    IdPuesto: number;
    IdEspecialidad: number;
    IdServicio: number;
    IdRenglon: number;
    IdInstitucion: number;
    TxtToken: string;
}

export class ActualizarAgregarEmpleado implements IActualizarAgregarEmpleado {
    IdEmpleado: number;
    TxtNit: string;
    TxtDpi: string;
    TxtNombres: string;
    TxtApellidos: string;
    IdPuesto: number;
    IdEspecialidad: number;
    IdServicio: number;
    IdRenglon: number;
    IdInstitucion: number;
    TxtToken: string;

    constructor(){
        this.IdEmpleado = 0;
        this.TxtNit = '';
        this.TxtDpi = '';
        this.TxtNombres = '';
        this.TxtApellidos = '';
        this.IdPuesto = 0;
        this.IdEspecialidad = 0;
        this.IdServicio = 0;
        this.IdRenglon = 0;
        this.IdInstitucion = 0;
        this.TxtToken = '';
    }
}