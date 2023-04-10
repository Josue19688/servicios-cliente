import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { VisitasComponent } from './visitas/visitas.component';
import { NovedadesComponent } from './novedades/novedades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageRoutingModule } from './page.routing.module';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    UsuariosComponent,
    ArchivosComponent,
    VisitasComponent,
    NovedadesComponent,
    PerfilComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    PageRoutingModule,
    FormsModule
  ],
  exports:[
    HomeComponent,
    DashboardComponent,
    UsuariosComponent,
    ArchivosComponent,
    VisitasComponent,
    NovedadesComponent,
    PerfilComponent
  ]
})
export class PageModule { }
