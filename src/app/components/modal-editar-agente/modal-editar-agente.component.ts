import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agente } from 'src/app/models/agente';
import { AgenteService } from 'src/app/services/agente.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-editar-agente',
  templateUrl: './modal-editar-agente.component.html',
  styleUrls: ['./modal-editar-agente.component.css']
})
export class ModalEditarAgenteComponent implements OnInit{

  agente!:Agente;

 miFormulario: FormGroup=this.fb.group({
    id:[this.agente?.id,[Validators.required]],
    nombre:['',[Validators.required]],
    dpi:['',[Validators.required,Validators.min(13),Validators.max(13)]],
    telefono:['',[Validators.required,Validators.maxLength(8)]],
    correo:['',[Validators.required,Validators.email]],
    nacimiento:['',[Validators.required]],
    direccion:['',[Validators.required]],
    igss:['',[Validators.required]],
    nit:['',[Validators.required]],
    sangre:['',[Validators.required]],
    puesto:['',[Validators.required]],
    grupo:['',[Validators.required]],
    status:['',[Validators.required]],
  })

  constructor(
    public mService:ModalService,
    private fb:FormBuilder,
    private sAgente:AgenteService,
  ){
    this.mService.agente.subscribe(resp=>this.agente=resp);
  }
  ngOnInit(): void {}

  agregar(){
    
   const {id} = this.agente;
    this.sAgente.updateAgente(this.miFormulario.value, id)
    .subscribe(resp=>{
      if(resp.ok==true){
        this.mService.agente.emit(this.miFormulario.value);
        this.miFormulario.reset();
        this.cerrarModal();
        Swal.fire('Buen trabajo!!','Registro actualizado correctamente!','success');
      }else{
        Swal.fire('Error','No se actualizo el registro!','error');
      }
    })
  }

  cerrarModal(){
    this.mService.cerrarModalEditarAgente();
  }
}
