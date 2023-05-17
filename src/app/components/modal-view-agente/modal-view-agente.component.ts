import { Component } from '@angular/core';
import { Agente } from 'src/app/models/agente';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-view-agente',
  templateUrl: './modal-view-agente.component.html',
  styleUrls: ['./modal-view-agente.component.css']
})
export class ModalViewAgenteComponent {

  agente!:Agente;
  constructor(
    public mService:ModalService
  ){
    this.mService.agente.subscribe(resp=>this.agente=resp);
  }

  cerrarModal(){
    this.mService.cerrarModalViewAgente();
  }

}
