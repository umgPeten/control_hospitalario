import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DialogoConfirmacionComponent,
    DialogoModificarComponent,
    LoginComponent,
    VistaUsuariosComponent,
    DialogAgregarUsuarioComponent
  ],
  providers: [],
  entryComponents: [
    DialogoConfirmacionComponent,
    DialogoModificarComponent,
    DialogAgregarUsuarioComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
