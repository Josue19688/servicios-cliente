import { Component, } from '@angular/core';

import * as moment from 'moment';
import { Novedad } from 'src/app/models/novedad';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent  {

  novedad!: Novedad;

  
  constructor(
    public modalService: ModalService
  ) {
    this.modalService.novedad
      .subscribe((resp: Novedad) => {
        this.novedad = resp;
      });
  
  }

 
  cerrarModal() {
    this.modalService.cerrarModal();
  }

  horaMes =(fecha:any)=>{
    const hoyMes = moment(fecha);
    return hoyMes.format('HH:mm a | MMMM D');
  }
  

}
