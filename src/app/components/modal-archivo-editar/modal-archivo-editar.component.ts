import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Archivo } from 'src/app/models/archivo';
import { ArchivoService } from 'src/app/services/archivo.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-archivo-editar',
  templateUrl: './modal-archivo-editar.component.html',
  styleUrls: ['./modal-archivo-editar.component.css']
})
export class ModalArchivoEditarComponent {

  archivo!:Archivo;

  miFormulario:FormGroup = this.fb.group({
    tipo:['',[Validators.required]],
    origen:['',[Validators.required]],
    unidad:['',[Validators.required]],
    numero:['',[Validators.required]],
    fecha:['',[Validators.required]],
    descripcion:['']
  })

  constructor(
    public mService:ModalService,
    private fb:FormBuilder,
    private archivoService:ArchivoService,
  ){
    this.mService.archivo.subscribe((resp:Archivo)=>this.archivo=resp);
  }

  agregar(){
    const {id}=this.archivo;
    this.archivoService.updateArchivo(this.miFormulario.value,id)
    .subscribe(resp=>{
      if(resp.ok==true){
        Swal.fire(
          'Buen Trabajo!',
          'El registro se ha creado!',
          'success'
        )
        this.mService.archivo.emit(this.miFormulario.value);
        this.miFormulario.reset();
        this.cerrarModal();
      }else{
        this.cerrarModal();
        Swal.fire('Upss!','No se agrego el registro!', 'error');
      }
    }); 
  }


  cerrarModal(){
    this.mService.cerrarModalEditarArchivo();
  }
}
