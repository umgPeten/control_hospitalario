import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { NewUser, Login, AfterLogin, DatosUsuarios } from '../models/usuarios';
import { UsuariosServiceService } from '../services/usuarios-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public emailChartType: ChartType;
    public emailChartData: any;
    public emailChartLegendItems: LegendItem[];

    public hoursChartType: ChartType;
    public hoursChartData: any;
    public hoursChartOptions: any;
    public hoursChartResponsive: any[];
    public hoursChartLegendItems: LegendItem[];

    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];
  constructor(
    public dialogo: MatDialog,
    private usuariosService: UsuariosServiceService
    ) { }

  ngOnInit() {
      this.emailChartType = ChartType.Pie;
      this.emailChartData = {
        labels: ['62%', '32%', '6%'],
        series: [62, 32, 6]
      };
      this.emailChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
        { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
      ];

      this.hoursChartType = ChartType.Line;
      this.hoursChartData = {
        labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.hoursChartOptions = {
        low: 0,
        high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.hoursChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.hoursChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Click', imageClass: 'fa fa-circle text-danger' },
        { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
      ];

      this.activityChartType = ChartType.Bar;
      this.activityChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        ]
      };
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
        { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
        { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
      ];

      this.PruebaServicio();
    }

    UserLogin: Login;
    afrterLogin: AfterLogin;
    newUser: NewUser;
    datosUsuarios: DatosUsuarios;

    PruebaServicio(){

      // this.newUser = new NewUser;
      // this.newUser.TxtApellidos = "Equite Sierra";
      // this.newUser.TxtDireccion = "Guatemala";
      // this.newUser.TxtEmail = "wera@gmail.com";
      // this.newUser.TxtNombres = "Gyssell Azucena";
      // this.newUser.TxtPassword = "asdf1234";
      // this.newUser.TxtToken = this.ObtenerLocalStorage();

      // this.usuariosService.ServerAgregarUsuario(this.newUser).subscribe(resultado =>{
      //   console.log(resultado);
      // },
      // error =>{
      //   console.log(error);
      // });

      // this.afrterLogin = new AfterLogin;
      // this.UserLogin = new Login;
      // this.UserLogin.TxtEmail = "lsosam2@miumg.edu.gt";
      // this.UserLogin.TxtPassword = "asdf1234";

      // this.usuariosService.ServerInicioDeSesion(this.UserLogin).subscribe(resultado =>{
      //   this.afrterLogin = resultado;
      //   this.AlmacenarLocalStorage(this.afrterLogin[0].TxtToken, this.afrterLogin[0]);
      //   console.log(this.ObtenerLocalStorage());
      // },
      // error =>{
      //   console.log(error);
      // });

      this.datosUsuarios = new DatosUsuarios;

      this.usuariosService.ServerObtenerUsuarios().subscribe(resultado =>{
        this.datosUsuarios = resultado;
        console.log(this.datosUsuarios);
      },
      error =>{
        console.log(error);
      });
    }

    AlmacenarLocalStorage(Token: string, datosUsuario: AfterLogin){
      localStorage.setItem("TxtToken", Token);
      localStorage.setItem("DatosUsuario", JSON.stringify(datosUsuario));
    }

    ObtenerLocalStorage(){
      return localStorage.getItem("TxtToken");
      return JSON.parse(localStorage.getItem("DatosUsuario"));
    }

    mostrarDialogo(): void {
      this.dialogo
        .open(DialogoConfirmacionComponent, {
          data: `¿Te gusta programar en TypeScript?`
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            alert("¡A mí también!");
          } else {
            alert("Deberías probarlo, a mí me gusta :)");
          }
        });
    }

}
