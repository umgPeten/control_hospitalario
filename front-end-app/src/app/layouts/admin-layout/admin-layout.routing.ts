import { Routes } from '@angular/router';

// import { HomeComponent } from '../../home/home.component';
// import { UserComponent } from '../../user/user.component';
// import { TablesComponent } from '../../tables/tables.component';
// import { TypographyComponent } from '../../typography/typography.component';
// import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
// import { NotificationsComponent } from '../../notifications/notifications.component';
// import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { VistaUsuariosComponent } from '../../components/vista-usuarios/vista-usuarios.component';
import { CrearEvaluacionComponent } from './../../components/menu/crear-evaluacion/crear-evaluacion.component';
import { EmpleadosComponent } from './../../components/menu/empleados/empleados.component';
import { ServiciosComponent } from './../../components/menu/servicios/servicios.component';
import { RenglonesComponent } from './../../components/menu/renglones/renglones.component';
import { PuestosComponent } from './../../components/menu/puestos/puestos.component';
import { EspecialidadesComponent } from './../../components/menu/especialidades/especialidades.component';
import { PermisosMenuComponent } from './../../components/permisos-menu/permisos-menu.component';

export const AdminLayoutRoutes: Routes = [
    // { path: 'dashboard', component: HomeComponent },
    // { path: 'user', component: UserComponent },
    // { path: 'table', component: TablesComponent },
    // { path: 'typography', component: TypographyComponent },
    // { path: 'icons', component: IconsComponent },
    // { path: 'maps', component: MapsComponent },
    // { path: 'notifications', component: NotificationsComponent },
    // { path: 'upgrade', component: UpgradeComponent },
    { path: 'usuarios', component: VistaUsuariosComponent},
    { path: 'menus', component: PermisosMenuComponent},
    // urls de el api
    { path: 'especialidades', component: EspecialidadesComponent},
    { path: 'puestos', component: PuestosComponent},
    { path: 'renglones', component: RenglonesComponent},
    { path: 'servicios', component: ServiciosComponent},
    { path: 'empleados', component: EmpleadosComponent},
    { path: 'crear-evaluacion', component: CrearEvaluacionComponent},
];
