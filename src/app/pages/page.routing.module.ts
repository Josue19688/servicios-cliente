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
import { IsadminGuard } from "../guards/isadmin.guard";



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
                canActivate:[IsadminGuard],
                data:{
                    allowedRoles:['ADMIN_ROLE','ENCARGADO_ROLE','AGENTE_ROLE']
                },
                component:AccesosComponent
            },
            {
                path:'novedades',
                canActivate:[IsadminGuard],
                data:{
                    allowedRoles:['ADMIN_ROLE','ENCARGADO_ROLE','AGENTE_ROLE']
                },
                component:NovedadesComponent
            },
            {
                path:'visitas',
                canActivate:[IsadminGuard],
                data:{
                    allowedRoles:['ADMIN_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','AGENTE_ROLE']
                },
                component:VisitasComponent
            },
            {
                path:'archivo',
                canActivate:[IsadminGuard],
                data:{
                    allowedRoles:['ADMIN_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE']
                },
                component:ArchivosComponent
            },
            {
                path:'usuario',
                canActivate:[IsadminGuard],
                data:{
                    allowedRoles:['ADMIN_ROLE']
                },
                component:UsuariosComponent
                
            },
            {
                path:'agente',
                canActivate:[IsadminGuard],
                data:{
                    allowedRoles:['ADMIN_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE']
                },
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