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
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
  ]
})
export class ComponentsModule { }
