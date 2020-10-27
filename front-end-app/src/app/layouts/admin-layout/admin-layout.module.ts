import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

// import { HomeComponent } from '../../home/home.component';
// import { UserComponent } from '../../user/user.component';
// import { TablesComponent } from '../../tables/tables.component';
// import { TypographyComponent } from '../../typography/typography.component';
// import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
// import { NotificationsComponent } from '../../notifications/notifications.component';
// import { UpgradeComponent } from '../../upgrade/upgrade.component';

// material
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

// componentes 
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoModificarComponent } from 'app/components/emergentes/dialogo-modificar/dialogo-modificar.component';
import { VistaUsuariosComponent } from 'app/components/vista-usuarios/vista-usuarios.component';
import { DialogAgregarUsuarioComponent } from 'app/components/emergentes/dialog-agregar-usuario/dialog-agregar-usuario.component';
import { DialogoNosotrosComponent } from 'app/components/emergentes/dialogo-nosotros/dialogo-nosotros.component';
import { PermisosMenuComponent } from 'app/components/permisos-menu/permisos-menu.component';
import { EspecialidadesComponent } from 'app/components/menu/especialidades/especialidades.component';
import { PuestosComponent } from 'app/components/menu/puestos/puestos.component';
import { RenglonesComponent } from 'app/components/menu/renglones/renglones.component';
import { EmpleadosComponent } from 'app/components/menu/empleados/empleados.component';
import { CrearEvaluacionComponent } from 'app/components/menu/crear-evaluacion/crear-evaluacion.component';
import { ServiciosComponent } from 'app/components/menu/servicios/servicios.component';
import { DialogoEmpleadoComponent } from 'app/components/emergentes/menu/dialogo-empleado/dialogo-empleado.component';
import { DialogoRenglonComponent } from 'app/components/emergentes/menu/dialogo-renglon/dialogo-renglon.component';
import { DialogoEspecialidadComponent } from 'app/components/emergentes/menu/dialogo-especialidad/dialogo-especialidad.component';
import { DialogoServicioComponent } from 'app/components/emergentes/menu/dialogo-servicio/dialogo-servicio.component';
import { DialogoPuestoComponent } from 'app/components/emergentes/menu/dialogo-puesto/dialogo-puesto.component';
import { FactoresComponent } from 'app/components/menu/factores/factores.component';
import { SubFactoresComponent } from 'app/components/menu/sub-factores/sub-factores.component';
import { EscalaDeCalificacionComponent } from 'app/components/menu/escala-de-calificacion/escala-de-calificacion.component';
import { TiposDeEvaluacionesComponent } from 'app/components/menu/tipos-de-evaluaciones/tipos-de-evaluaciones.component';
import { EvaluacionesEncabezadoComponent } from 'app/components/menu/evaluaciones-encabezado/evaluaciones-encabezado.component';
import { EvaluacionesDetalleComponent } from 'app/components/menu/evaluaciones-detalle/evaluaciones-detalle.component';
import { EvaluacionesAplicadasEncabezadoComponent } from './../../components/menu/evaluaciones-aplicadas-encabezado/evaluaciones-aplicadas-encabezado.component';
import { EvaluacionesAplicadasDetalleComponent } from 'app/components/menu/evaluaciones-aplicadas-detalle/evaluaciones-aplicadas-detalle.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
  ],
  declarations: [
    // HomeComponent,
    // UserComponent,
    // TablesComponent,
    // TypographyComponent,
    // IconsComponent,
    // MapsComponent,
    // NotificationsComponent,
    // UpgradeComponent,
    DialogoConfirmacionComponent,
    DialogoModificarComponent,
    VistaUsuariosComponent,
    DialogAgregarUsuarioComponent,
    DialogoNosotrosComponent,
    PermisosMenuComponent,
    EspecialidadesComponent,
    PuestosComponent,
    RenglonesComponent,
    EmpleadosComponent,
    CrearEvaluacionComponent,
    ServiciosComponent,
    DialogoEmpleadoComponent,
    DialogoRenglonComponent,
    DialogoEspecialidadComponent,
    DialogoServicioComponent,
    DialogoPuestoComponent,
    FactoresComponent,
    SubFactoresComponent,
    EscalaDeCalificacionComponent,
    TiposDeEvaluacionesComponent,
    EvaluacionesEncabezadoComponent,
    EvaluacionesDetalleComponent,
    EvaluacionesAplicadasEncabezadoComponent,
    EvaluacionesAplicadasDetalleComponent,
  ],
  entryComponents: [
    DialogoConfirmacionComponent,
    DialogoModificarComponent,
    DialogAgregarUsuarioComponent,
    DialogoNosotrosComponent,
    DialogoEmpleadoComponent,
    DialogoRenglonComponent,
    DialogoEspecialidadComponent,
    DialogoServicioComponent,
    DialogoPuestoComponent
  ],
})

export class AdminLayoutModule {}
