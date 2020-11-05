import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { NgModule, Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes =[
  { path: '', redirectTo: 'usuarios', pathMatch: 'full',}, 
  { path: '', component: AdminLayoutComponent, canActivate: [CanActivateGuard],
    children: 
    [
      { path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule' }
    ]
  },
  { path: 'login',  component: LoginComponent},
  { path: '404', component: PaginaNoEncontradaComponent},
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
