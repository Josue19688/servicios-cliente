import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArchivosComponent } from "./archivos/archivos.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { NovedadesComponent } from "./novedades/novedades.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { VisitasComponent } from "./visitas/visitas.component";
import { AuthGuard } from "../guards/auth.guard";
import { PerfilComponent } from "./perfil/perfil.component";
import { AccesosComponent } from "./accesos/accesos.component";
import { AgenteComponent } from "./agente/agente.component";



const routes:Routes=[
    {
        path:'',
        component:HomeComponent,
        canActivate:[AuthGuard],
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'accesos',
                component:AccesosComponent
            },
            {
                path:'novedades',
                component:NovedadesComponent
            },
            {
                path:'visitas',
                component:VisitasComponent
            },
            {
                path:'archivo',
                component:ArchivosComponent
            },
            {
                path:'usuario',
                component:UsuariosComponent
            },
            {
                path:'agente',
                component:AgenteComponent
            },
            {
                path:'perfil',
                component:PerfilComponent
            },
            {
                path:'**',
                redirectTo:'dashboard'
            }
        ]
    }
]




@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PageRoutingModule { }