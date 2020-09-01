export interface INewUser{
    TxtNombres: string;
    TxtApellidos: string;
    TxtDireccion: string;
    TxtEmail: string;
    TxtPassword: string;
    TxtToken: string;
}

export class NewUser implements INewUser{
    TxtNombres: string;
    TxtApellidos: string;
    TxtDireccion: string;
    TxtEmail: string;
    TxtPassword: string;
    TxtToken: string;

    constructor(){
        this.TxtNombres = '';
        this.TxtApellidos= '';
        this.TxtDireccion = '';
        this.TxtEmail= '';
        this.TxtPassword= '';
        this.TxtToken= '';
    }
}

export interface ILogin{
    TxtEmail: String;
    TxtPassword: string;
}

export class Login implements ILogin{
    TxtEmail: String;
    TxtPassword: string;

    constructor(){
        this.TxtEmail = '';
        this.TxtPassword = '';
    }
}

export interface IAfterLogin{
    IdInstitucion: number;
    IntResultado: number;
    TxtToken: string;
    TxtUsuario: string;
}

export class AfterLogin implements IAfterLogin{
    IdInstitucion: number;
    IntResultado: number;
    TxtToken: string;
    TxtUsuario: string;

    constructor(){
        this.IdInstitucion = 0;
        this.IntResultado = 0;
        this.TxtToken = '';
        this.TxtUsuario = '';
    }
}

export interface IDatosUsuarios{
    FechaIngreso: string;
    IdUsuario: number;
    IntEstado: number;
    TxtDireccion: string;
    TxtEmail: string;
    TxtNombres: string;
    TxtPassword: string;
}

export class DatosUsuarios implements IDatosUsuarios{
    FechaIngreso: string;
    IdUsuario: number;
    IntEstado: number;
    TxtDireccion: string;
    TxtEmail: string;
    TxtNombres: string;
    TxtPassword: string;
    
    constructor(){
        this.FechaIngreso = '';
        this.IdUsuario = 0;
        this.IntEstado = 0;
        this.TxtDireccion = '';
        this.TxtEmail = '';
        this.TxtNombres = '';
        this.TxtPassword = '';
    }
}