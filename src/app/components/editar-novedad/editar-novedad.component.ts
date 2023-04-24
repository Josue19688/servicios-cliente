import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Novedad } from 'src/app/models/novedad';
import { ModalService } from 'src/app/services/modal.service';
import { NovedadesService } from 'src/app/services/novedades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-novedad',
  templateUrl: './editar-novedad.component.html',
  styleUrls: ['./editar-novedad.component.css']
})
export class EditarNovedadComponent {

  novedad!: Novedad;
  miFormulario:FormGroup = this.fb.group({
    tipo:['',[Validators.required]],
    hora:['',[Validators.required]],
    fecha:['',[Validators.required]],
    puesto:['',[Validators.required]],
    preliminar:['',[Validators.required]],
    descripcion:['']
  })

  constructor(
    private fb:FormBuilder,
    public modalService:ModalService,
    private nService : NovedadesService,
  ){
    this.modalService.novedad
    .subscribe((resp: Novedad) => {
      this.novedad = resp;
    });
  }

  agregar(){

    const {id} = this.novedad;
    this.nService.actualizarNovedad(id,this.miFormulario.value)
    .subscribe(resp=>{
      if(resp.ok){
        Swal.fire(
          'Buen Trabajo!',
          'El registro se ha creado!',
          'success'
        )
        this.modalService.novedad.emit(this.miFormulario.value);
        this.miFormulario.reset();
        this.cerrarModal();
      }
    })  
  }

  cerrarModal() {
    this.modalService.cerrarModalEditarNovedad();
  }

  horaMes =(fecha:any)=>{
    const hoyMes = moment(fecha);
    return hoyMes.format('HH:mm a | MMMM D');
  }
}
