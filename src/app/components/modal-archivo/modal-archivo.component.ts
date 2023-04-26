import { Component } from '@angular/core';
import * as moment from 'moment';
import { Archivo } from 'src/app/models/archivo';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-archivo',
  templateUrl: './modal-archivo.component.html',
  styleUrls: ['./modal-archivo.component.css']
})
export class ModalArchivoComponent {

  archivo!:Archivo;
  constructor(
    public mService:ModalService
  ){
    this.mService.archivo.subscribe((resp:Archivo)=>this.archivo=resp);
  }


  cerrarModal(){
    this.mService.cerrarModalArchivos();
  }
  horaMes =(fecha:any)=>{
    const hoyMes = moment(fecha);
    return hoyMes.format('HH:mm a | MMMM D');
  }
}
