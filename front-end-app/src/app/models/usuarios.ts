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

export interface IModUsuario{
    IdUsuario: number;
    TxtDireccion: string;
    TxtEmail: string;
    TxtNombres: string;
    TxtApellidos: string;
    TxtPassword: string;
}

export class ModUsuario implements IModUsuario{
    IdUsuario: number;
    TxtDireccion: string;
    TxtEmail: string;
    TxtNombres: string;
    TxtApellidos: string;
    TxtPassword: string;
    
    constructor(){
        this.IdUsuario = 0;
        this.TxtDireccion = '';
        this.TxtEmail = '';
        this.TxtNombres = '';
        this.TxtApellidos = '';
        this.TxtPassword = '';
    }
}

export interface IObtenerMenu{
    TxtToken: string;
    IdModulo: number;
}

export class ObtenerMenu implements IObtenerMenu{
    TxtToken: string;
    IdModulo: number;

    constructor(){
        this.TxtToken = '';
        this.IdModulo = 0;
    }
}

export interface IMenu{
    IdMenu: number;
    TxtNomnre: string;
    TxtLink: string;
    IdMenuPadre: number;
    TxtImagen: string;
    Agregar: boolean;
    ModificarActualizar: boolean;
    Eliminar: boolean;
    consultar: boolean;
    Imprimir: boolean;
    Aprobar: boolean;
    Reversa: boolean;
    Finalizar: boolean;
}

export class Menu implements IMenu{
    IdMenu: number;
    TxtNomnre: string;
    TxtLink: string;
    IdMenuPadre: number;
    TxtImagen: string;
    Agregar: boolean;
    ModificarActualizar: boolean;
    Eliminar: boolean;
    consultar: boolean;
    Imprimir: boolean;
    Aprobar: boolean;
    Reversa: boolean;
    Finalizar: boolean;

    constructor(){
        this.IdMenu = 0;
        this.TxtNomnre = '';
        this.TxtLink = '';
        this.IdMenuPadre = 0;
        this.TxtImagen = '';
        this.Agregar = null;
        this.ModificarActualizar = null;
        this.Eliminar = null;
        this.consultar = null;
        this.Imprimir = null;
        this.Aprobar = null;
        this.Reversa = null;
        this.Finalizar = null;
    }
}