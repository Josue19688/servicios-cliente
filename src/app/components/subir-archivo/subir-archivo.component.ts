import { Component } from '@angular/core';
import { Visita } from 'src/app/models/visita';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-archivo',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.css']
})
export class SubirArchivoComponent {

  subirImagen!: File;
  imgTemporal:any=null;
  visita!:Visita;
  constructor(
    public mService:ModalService,
    private fileService:FileUploadService
  ){
    this.mService.visita.subscribe((resp:Visita)=>this.visita=resp);
  }


  cambiarImagen(event:any){
    this.subirImagen= event.target.files[0];

    if(!event.target.files[0]){
      return this.imgTemporal=null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = ()=>{
     
      this.imgTemporal=reader.result;
    }
    return true;

  }

  actualizarImagen(){

    
    const {id}  = this.visita;
   
   
    this.fileService.actualizarFoto(this.subirImagen,'visita',Number(id))
    .then(img=>{
      Swal.fire('Buen Trabajo!','Imagen actualizada correctamente!','success');
     
    }).catch(error=>{
      Swal.fire('Upss!','No se actualizo la imagen!','error');
    })
  }
  

  cerrarModal(){
    this.mService.cerrarModalArchivo();
  
  }
}
