import { DatosUsuarios } from '../../models/usuarios';
import { UsuariosServiceService } from '../../services/usuarios/usuarios-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-usuarios',
  templateUrl: './vista-usuarios.component.html',
  styleUrls: ['./vista-usuarios.component.css']
})
export class VistaUsuariosComponent implements OnInit {
  allUsers: DatosUsuarios;

  constructor(
    private usuariosService: UsuariosServiceService
  ) { }

  ngOnInit(): void {
    this.allUsers = new DatosUsuarios;
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.usuariosService.ServerObtenerUsuarios().subscribe(resultado =>{
      this.allUsers = resultado;
    },
    error =>{
      console.log(error);
    })
  }

  eliminarUsuario(id: string){
    console.log(id);
  }

  modificarUsuario(id: string){
    console.log(id);
  }
}
