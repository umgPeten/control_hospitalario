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
  loginUser: Login;
  afterLogin: AfterLogin;
  email: string;
  password: string;
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
    this.loginUser.TxtEmail = this.email;
    this.loginUser.TxtPassword = this.password;
    
    this.spinner.show();
    this.usuariosService.ServerInicioDeSesion(this.loginUser).subscribe(resultado =>{
      this.afterLogin = resultado;
      if(this.afterLogin[0].IntResultado === 0){
        this.spinner.hide();
        this.showNotification(this.afterLogin[0].TxtToken);
      }
      else{
        this.spinner.hide();
        this.routerRedirect = this.usuariosService.intentoDeAcceso;
        this.usuariosService.intentoDeAcceso = '';
        this.AlmacenarLocalStorage(this.afterLogin[0]);
        this.router.navigate([this.routerRedirect]);
        // this.router.navigate(['/dashboard']);
      }
    },
    error =>{
      this.spinner.hide();
      this.showNotification("Problemas tecnicos :3");
    });
  }

  AlmacenarLocalStorage(datosUsuario: AfterLogin){
    localStorage.setItem("SessionStarted", "1");
    localStorage.setItem("DatosUsuario", JSON.stringify(datosUsuario));
  }

  showNotification(mensaje: string){
    const type = ['','info','success','warning','danger'];

    $.notify({
        icon: "",
        message: mensaje
    },{
        type: type[4],
        timer: 1000,
        placement: {
            from: "top",
            align: "left"
        }
    });
}

}
