import { Component, OnInit } from '@angular/core';
import { Archivo } from 'src/app/models/archivo';
import { Novedad } from 'src/app/models/novedad';
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

  imgActual:any=null;
  modelo:any='';
  id:number=0;


  visita!:Visita;
  novedad!:Novedad;
  archivo!:Archivo;

  constructor(
    public mService:ModalService,
    private fileService:FileUploadService
  ){
    this.mService.visita.subscribe((resp:Visita)=>this.visita=resp);
    this.mService.novedad.subscribe((resp:Novedad)=>this.novedad=resp);
    this.mService.archivo.subscribe((resp:Archivo)=>this.archivo=resp);
    this.mService.modelo.subscribe((resp:any)=>this.modelo=resp);
    
  }
  
  get imagenUrl(){
    switch(this.modelo){
      case 'visita':
        return this.visita.imagenUrl;
      
      case 'novedad':
        return this.novedad.imagenUrl;
        
      case 'archivo':
        return this.archivo.imagenUrl;
        
      default:
        return false;
    }
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
    
    switch(this.modelo){
      case 'visita':
        this.id = this.visita.id;
        break;
      case 'novedad':
        this.id = this.novedad.id;
        break;
      case 'archivo':
        this.id = this.archivo.id;
        break;
      default:
        console.log('No se encontro el modelo')
    }
    
    this.fileService.actualizarFoto(this.subirImagen,this.modelo,this.id)
    .then(img=>{
      this.cerrarModal()
      Swal.fire('Buen Trabajo!','Imagen actualizada correctamente!','success');
       
    }).catch(error=>{
      this.cerrarModal()
      Swal.fire('Upss!','No se actualizo la imagen!','error');
    })
    
  }
  

  cerrarModal(){
    this.mService.cerrarModalArchivo();
  
  }
}
