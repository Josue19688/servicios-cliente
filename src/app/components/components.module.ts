import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoPersonalComponent } from './ingreso-personal/ingreso-personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresoVehiculoComponent } from './ingreso-vehiculo/ingreso-vehiculo.component';
import { RegistroAgenteComponent } from './registro-agente/registro-agente.component';
import { AgentesSuspendidosComponent } from './agentes-suspendidos/agentes-suspendidos.component';
import { DataTablesModule } from 'angular-datatables';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { EditarNovedadComponent } from './editar-novedad/editar-novedad.component';
import { EditarVisitaComponent } from './editar-visita/editar-visita.component';
import { VisitaViewComponent } from './visita-view/visita-view.component';
import { SubirArchivoComponent } from './subir-archivo/subir-archivo.component';
import { ModalArchivoComponent } from './modal-archivo/modal-archivo.component';
import { ModalArchivoEditarComponent } from './modal-archivo-editar/modal-archivo-editar.component';
import { ModalEditarVehiculoComponent } from './modal-editar-vehiculo/modal-editar-vehiculo.component';
import { AgenteBajaComponent } from './agente-baja/agente-baja.component';
import { AgentesVacacionesComponent } from './agentes-vacaciones/agentes-vacaciones.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ModalEditarAgenteComponent } from './modal-editar-agente/modal-editar-agente.component';
import { ModalViewAgenteComponent } from './modal-view-agente/modal-view-agente.component';
import { ReportenovedadesComponent } from './reportes/reportenovedades/reportenovedades.component';



@NgModule({
  declarations: [
    ModalUsuarioComponent,
    IngresoPersonalComponent,
    IngresoVehiculoComponent,
    RegistroAgenteComponent,
    AgentesSuspendidosComponent,
    EditarNovedadComponent,
    EditarVisitaComponent,
    VisitaViewComponent,
    SubirArchivoComponent,
    ModalArchivoComponent,
    ModalArchivoEditarComponent,
    ModalEditarVehiculoComponent,
    AgenteBajaComponent,
    AgentesVacacionesComponent,
    ModalEditarAgenteComponent,
    ModalViewAgenteComponent,
    ReportenovedadesComponent,
  ],
  exports:[
    ModalUsuarioComponent,
    IngresoPersonalComponent,
    IngresoVehiculoComponent,
    RegistroAgenteComponent,
    AgentesSuspendidosComponent,
    EditarNovedadComponent,
    EditarVisitaComponent,
    VisitaViewComponent,
    SubirArchivoComponent,
    ModalArchivoComponent,
    ModalArchivoEditarComponent,
    ModalEditarVehiculoComponent,
    AgenteBajaComponent,
    AgentesVacacionesComponent,
    ModalEditarAgenteComponent,
    ModalViewAgenteComponent,
    ReportenovedadesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    PdfViewerModule
  ]
})
export class ComponentsModule { }
