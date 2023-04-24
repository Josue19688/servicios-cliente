import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Visita } from 'src/app/models/visita';
import { ModalService } from 'src/app/services/modal.service';
import { VisitasService } from 'src/app/services/visitas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-visita',
  templateUrl: './editar-visita.component.html',
  styleUrls: ['./editar-visita.component.css']
})
export class EditarVisitaComponent {
  visita!:Visita;

  miFormulario:FormGroup = this.fb.group({
    tipo:['',[Validators.required]],
    puesto:['',[Validators.required]],
    dpi:['',[Validators.required]],
    nombre:['',[Validators.required]],
    ingreso:['',[Validators.required]],
    salida:['',[Validators.required]],
    placa:['',[Validators.required]],
    vehiculo:['',[Validators.required]],
    colaborador:['',[Validators.required]],
    proveniente:['',[Validators.required]]
  })
  constructor(
    public mService:ModalService,
    private fb:FormBuilder,
    private visitaService:VisitasService,
  ){
    this.mService.visita
    .subscribe((resp:Visita)=>{
      this.visita=resp;
    })
  }

  agregar(){
    const {id} = this.visita;
    this.visitaService.updateVisita(id,this.miFormulario.value)
    .subscribe(resp=>{
      if(resp.ok){
          Swal.fire('Buen Trabajo!','Registros actualizado exitosamente!','success');
      }
      this.mService.visita.emit(this.miFormulario.value);
      this.miFormulario.reset();
      this.cerrarModal();
    })
    
 
  }

  cerrarModal(){
    this.mService.cerrarModalEditarVisita();
  }
  horaMes =(fecha:any)=>{
    const hoyMes = moment(fecha);
    return hoyMes.format('HH:mm a | MMMM D');
  }
  
}
