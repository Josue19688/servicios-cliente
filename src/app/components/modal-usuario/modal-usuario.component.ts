import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { NovedadesService } from 'src/app/services/novedades.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent  {

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
    private nService : NovedadesService,
    public modalService:ModalService
    ){}

  cerrarModal(){
    this.modalService.cerrarModal();
  }
  agregar(){

    this.nService.newNovedad(this.miFormulario.value)
    .subscribe(resp=>{
      this.cerrarModal();
      this.modalService.nuevaNovedad.emit(resp.novedad);
      
        
        Swal.fire(
          'Buen Trabajo!',
          'El registro se ha creado!',
          'success'
        )
      
     
    })
  }
}
