import { EvaluacionesAplicadasEncabezadoComponent } from './../../components/menu/evaluaciones-aplicadas-encabezado/evaluaciones-aplicadas-encabezado.component';
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
import { FactoresComponent } from 'app/components/menu/factores/factores.component';
import { SubFactoresComponent } from 'app/components/menu/sub-factores/sub-factores.component';
import { EscalaDeCalificacionComponent } from 'app/components/menu/escala-de-calificacion/escala-de-calificacion.component';
import { TiposDeEvaluacionesComponent } from 'app/components/menu/tipos-de-evaluaciones/tipos-de-evaluaciones.component';
import { EvaluacionesDetalleComponent } from 'app/components/menu/evaluaciones-detalle/evaluaciones-detalle.component';
import { EvaluacionesAplicadasDetalleComponent } from 'app/components/menu/evaluaciones-aplicadas-detalle/evaluaciones-aplicadas-detalle.component';
import { EvaluacionesEncabezadoComponent } from 'app/components/menu/evaluaciones-encabezado/evaluaciones-encabezado.component';

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

    { path: 'factores', component: FactoresComponent},
    { path: 'sub-factores', component: SubFactoresComponent},
    { path: 'escalas-de-calificacion', component: EscalaDeCalificacionComponent},
    { path: 'tipos-de-evaluacion', component: TiposDeEvaluacionesComponent},
    { path: 'evaluaciones-encabezado', component: EvaluacionesEncabezadoComponent},
    { path: 'evaluaciones-detalle', component: EvaluacionesDetalleComponent},
    { path: 'evaluaciones-aplicadas-encabezado', component: EvaluacionesAplicadasEncabezadoComponent},
    { path: 'evaluaciones-aplicadas-detalle', component: EvaluacionesAplicadasDetalleComponent},
];
