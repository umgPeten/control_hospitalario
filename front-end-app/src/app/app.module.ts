import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
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

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DialogoConfirmacionComponent } from './components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoModificarComponent } from './components/emergentes/dialogo-modificar/dialogo-modificar.component';
import { LoginComponent } from './components/login/login.component';
import { VistaUsuariosComponent } from './components/vista-usuarios/vista-usuarios.component';
import { DialogAgregarUsuarioComponent } from './components/emergentes/dialog-agregar-usuario/dialog-agregar-usuario.component';
import { DialogoNosotrosComponent } from './components/emergentes/dialogo-nosotros/dialogo-nosotros.component';
import { BrowserModule } from '@angular/platform-browser';
import { DomseguroPipe } from './pipes/domseguro/domseguro.pipe';
import { NoimagePipe } from './pipes/noimage/noimage.pipe';
import { PermisosMenuComponent } from './components/permisos-menu/permisos-menu.component';
import { EspecialidadesComponent } from './components/menu/especialidades/especialidades.component';
import { PuestosComponent } from './components/menu/puestos/puestos.component';
import { RenglonesComponent } from './components/menu/renglones/renglones.component';
import { EmpleadosComponent } from './components/menu/empleados/empleados.component';
import { CrearEvaluacionComponent } from './components/menu/crear-evaluacion/crear-evaluacion.component';
import { ServiciosComponent } from './components/menu/servicios/servicios.component';
import { DialogoEmpleadoComponent } from './components/emergentes/menu/dialogo-empleado/dialogo-empleado.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DialogoRenglonComponent } from './components/emergentes/menu/dialogo-renglon/dialogo-renglon.component';
import { DialogoEspecialidadComponent } from './components/emergentes/menu/dialogo-especialidad/dialogo-especialidad.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    BrowserModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DialogoConfirmacionComponent,
    DialogoModificarComponent,
    LoginComponent,
    VistaUsuariosComponent,
    DialogAgregarUsuarioComponent,
    DialogoNosotrosComponent,
    DomseguroPipe,
    NoimagePipe,
    PermisosMenuComponent,
    EspecialidadesComponent,
    PuestosComponent,
    RenglonesComponent,
    EmpleadosComponent,
    CrearEvaluacionComponent,
    ServiciosComponent,
    DialogoEmpleadoComponent,
    DialogoRenglonComponent,
    DialogoEspecialidadComponent
  ],
  providers: [],
  entryComponents: [
    DialogoConfirmacionComponent,
    DialogoModificarComponent,
    DialogAgregarUsuarioComponent,
    DialogoNosotrosComponent,
    DialogoEmpleadoComponent,
    DialogoRenglonComponent,
    DialogoEspecialidadComponent
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
