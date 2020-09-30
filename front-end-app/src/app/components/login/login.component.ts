import { Router } from '@angular/router';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Component, OnInit } from '@angular/core';
import { Login, AfterLogin } from 'app/models/usuarios';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginUser: Login;
  afterLogin: AfterLogin;
  routerRedirect: string = "";

  constructor(
    private usuariosService: UsuariosServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.loginUser = new Login;
    this.afterLogin = new AfterLogin;
  }

  InisiarSesion(){
    this.spinner.show();
    if(this.comprobarCampos()){
      this.usuariosService.ServerInicioDeSesion(this.loginUser).subscribe(resultado =>{
        this.afterLogin = resultado;
        this.AlmacenarSessionStorage(this.afterLogin[0]);
        if(this.afterLogin[0].IntResultado === 0){
          this.spinner.hide();
          this.Mensaje(this.afterLogin[0].TxtToken, 4, 1, 1);
        }
        else{
          this.spinner.hide();
          this.routerRedirect = this.usuariosService.intentoDeAcceso;
          this.usuariosService.intentoDeAcceso = '';
          this.router.navigate([this.routerRedirect]);
          // this.router.navigate(['/dashboard']);
        }
      },
      error =>{
        this.spinner.hide();
        this.Mensaje(error.statusText, 4, 1, 1);
      });
    }
    else{
      this.spinner.hide();
      this.Mensaje("Por favor completar todos los campos", 3, 1, 1);
    }
  }

  comprobarCampos(){
    if(
        this.loginUser.TxtEmail !== '' &&
        this.loginUser.TxtPassword !== ''
      ){
      return true;
    }
    else{
      return false;
    }
  }

  AlmacenarSessionStorage(datosUsuario: AfterLogin){
    sessionStorage.setItem("SessionStarted", "1");
    sessionStorage.setItem("DatosUsuario", JSON.stringify(datosUsuario));
  }

  Mensaje(mensaje: any, color: number, posY:number, posX: number){
    const type = ['','info','success','warning','danger'];
    const from = ['', 'top', 'bottom'];
    const align = ['', 'left', 'center', 'right'];

    $.notify({
        icon: "",
        message: mensaje
    },{
        type: type[color],
        timer: 1000,
        placement: {
            from: from[posY],
            align: align[posX]
        }
    });
  }

}
