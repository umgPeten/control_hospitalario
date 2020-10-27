import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosEscalaDeCalificacion } from 'app/models/escalasDeCalificacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-escala-de-calificacion',
  templateUrl: './escala-de-calificacion.component.html',
  styleUrls: ['./escala-de-calificacion.component.css']
})
export class EscalaDeCalificacionComponent implements OnInit {
  displayedColumns: string[] = ['TxtSubFactor', 'TxtFactor', 'TxtDescripcion', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosEscalaDeCalificacion>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
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
}
