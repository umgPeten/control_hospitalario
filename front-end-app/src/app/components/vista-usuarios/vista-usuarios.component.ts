import { ExporterService } from './../../services/exporter.service';
import { DialogoModificarComponent } from './../emergentes/dialogo-modificar/dialogo-modificar.component';
import { DialogoConfirmacionComponent } from '../emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { DatosUsuarios } from '../../models/usuarios';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAgregarUsuarioComponent } from '../emergentes/dialog-agregar-usuario/dialog-agregar-usuario.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

// declare var $:any;

@Component({
  selector: 'app-vista-usuarios',
  templateUrl: './vista-usuarios.component.html',
  styleUrls: ['./vista-usuarios.component.css']
})
export class VistaUsuariosComponent implements OnInit  {
  // allUsers: DatosUsuarios;
  IdUser = {
      IdUsuario: 0,
      TxtToken: ''
    };
  displayedColumns: string[] = ['TxtNombres', 'TxtDireccion', 'TxtEmail', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosUsuarios>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  filtrado: boolean = false;

  constructor(
    private usuariosService: UsuariosServiceService,
    public dialogo: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router,
    private exporterService: ExporterService,
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    // this.allUsers = new DatosUsuarios;
    this.cargarUsuarios();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filtrado = true;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarUsuarios(){
    this.spinner.show();
    this.usuariosService.ServerObtenerUsuarios().subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.dataSource = new MatTableDataSource(resultado);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.allUsers = resultado;
        
        this.spinner.hide();
      }
      else{
        this.spinner.hide();
        sessionStorage.setItem("DatosUsuario", "");
        sessionStorage.setItem("SessionStarted", "0");
        this.router.navigate(['/login']);
        // this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
        this.alert('info', "Token del usuario activo invalido");
      }
    },
    error =>{
      this.spinner.hide();
      this.alert('error',error.statusText);
    });
  }

  eliminarUsuario(user: DatosUsuarios){
    this.IdUser.IdUsuario = user.IdUsuario;
    this.spinner.show();
    
    this.dialogo.open(DialogoConfirmacionComponent, {
        data: `eliminar usuario '${user.TxtNombres}'`
      }).afterClosed().subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.usuariosService.ServerEliminarUsuario(this.IdUser).subscribe(resultado =>{
            if(resultado !== 0){
              if(resultado[0].EstadoToken !== '0'){
                // this.Mensaje(`Usuario '${user.TxtNombres}' eliminado`, 2, 1, 3);
                this.alert('success', `Usuario '${user.TxtNombres}' eliminado`);
                this.cargarUsuarios();
                
                this.spinner.hide();
              }
              else{
                this.spinner.hide();
                sessionStorage.setItem("DatosUsuario", "");
                sessionStorage.setItem("SessionStarted", "0");
                this.router.navigate(['/login']);
                // this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
                this.alert('info', "Token del usuario activo invalido");
              }
            }
            else{
              // this.Mensaje("Error del servidor", 3, 1, 1);
              this.alert('error', "Error del servidor");
            }
          },
          error =>{
            // this.Mensaje(error.statusText, 4, 1, 1);
            this.alert('error',error.statusText);
          })
        } else {
          // this.Mensaje("No se a realizado ninguna accion", 3, 1, 1);
          this.alert('info', "No se ha realizado ninguna accion");
        }
      });
  }

  modificarUsuario(IdUsuario: number){
    this.dialogo.open(DialogoModificarComponent, {
      data: IdUsuario
    }).afterClosed().subscribe((resultado: Boolean) =>{
      if(resultado){
        // this.Mensaje("Usuario modificado exitosamente", 2, 1, 3);
        this.alert('success', "Usuario modificado exitosamente");
        this.cargarUsuarios();
      }
      else{
        // this.Mensaje("No se a realizado ninguna accion", 3, 1, 1);
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  AgregarUsuario(){
    this.dialogo.open(DialogAgregarUsuarioComponent).afterClosed().subscribe((resultado: string) =>{
      if(resultado){
        // this.Mensaje("Usuario '" + resultado + "' ingresado exitosamente", 2, 1, 3);
        this.alert('success', "Usuario '" + resultado + "' ingresado exitosamente");
        this.cargarUsuarios();
      }
      else{
        // this.Mensaje("No se a realizado ninguna accion", 3, 1, 1);
        this.alert('info', "No se ha realizado ninguna accion");
      }
    })
  }

  alert(icon: any, title: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icon,
      title: title
    })
  }

  imprimirExel(){
    this.spinner.show();
    if(this.filtrado){
      this.exporterService.exportToExel(this.dataSource.filteredData, 'Usuarios');  
    }
    else{
      this.exporterService.exportToExel(this.dataSource.data, 'Usuarios');
    }
    this.spinner.hide();
  }

  // Mensaje(mensaje: any, color: number, posY:number, posX: number){
  //   const type = ['','info','success','warning','danger'];
  //   const from = ['', 'top', 'bottom'];
  //   const align = ['', 'left', 'center', 'right'];

  //   $.notify({
  //       icon: "",
  //       message: mensaje
  //   },{
  //       type: type[color],
  //       timer: 1000,
  //       placement: {
  //           from: from[posY],
  //           align: align[posX]
  //       }
  //   });
  // }
}
