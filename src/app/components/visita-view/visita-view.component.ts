import { Component } from '@angular/core';
import * as moment from 'moment';
import { Visita } from 'src/app/models/visita';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-visita-view',
  templateUrl: './visita-view.component.html',
  styleUrls: ['./visita-view.component.css']
})
export class VisitaViewComponent {

  visita!:Visita;

  constructor(
    public mService:ModalService
  ){
    this.mService.visita
    .subscribe((resp:Visita)=>{
      this.visita=resp;
    })
  }

  cerrarModal(){
    this.mService.cerrarModalVisita();
  }

  horaMes =(fecha:any)=>{
    const hoyMes = moment(fecha);
    return hoyMes.format('HH:mm a | MMMM D');
  }
}
