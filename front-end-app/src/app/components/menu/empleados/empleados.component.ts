import { EmpleadosService } from './../../../services/empleados.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosEmpleado } from 'app/models/empleados';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';

declare var $:any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmpleadosComponent implements OnInit {
  displayedColumns: string[] = [
    'TxtNombres',
    'TxtApellidos',
    'TxtNit',
    'TxtDpi',
    'FechaIngreso',
    'opciones'
  ];
  headers: string[] = [''];
  dataSource: MatTableDataSource<DatosEmpleado>;
  expandedElement: DatosEmpleado | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private spinner: NgxSpinnerService,
    public dialogo: MatDialog,
    private empleadosService: EmpleadosService,
  ) { }

  ngOnInit(): void {
    // this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    this.cargarEmpleados();
  }

  cargarEmpleados(){
    // console.log("carga de empleados");
    this.spinner.show();
    this.empleadosService.ServicioObtenerEmpleados().subscribe( resultado => {
      this.dataSource = new MatTableDataSource(resultado);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      this.Mensaje(error.statusText, 4, 1, 1);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
