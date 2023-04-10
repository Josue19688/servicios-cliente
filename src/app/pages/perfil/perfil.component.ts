import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';

import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  miFormulario!: FormGroup;
  subirImagen!: File;
  user!:Usuario;
  imgTemporal:any=null;
  
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private fileService:FileUploadService
  ){
   if(this.authService.usuario){
    this.user=this.authService.usuario;
   }
  }
  
  ngOnInit(): void {
    this.miFormulario=this.fb.group({
      nombre:[this.authService.usuario?.nombre,[Validators.required]],
      correo:[this.authService.usuario?.correo,[Validators.required,Validators.email]],
      unidad:[this.authService.usuario?.unidad,[Validators.required,Validators.email]],
      rol:[this.authService.usuario?.rol,[Validators.required,Validators.email]],
    })
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
    let id;
    if(this.authService.usuario!=undefined){
      id =this.authService.usuario.id;
    }
   
    this.fileService.actualizarFoto(this.subirImagen,'usuario',Number(id))
    .then(img=>{
      if(this.authService.usuario!=undefined){
        this.authService.usuario.imagen=img;
      }
     
      Swal.fire('Buen Trabajo!','Imagen actualizada correctamente!','success');
     
    }).catch(error=>{
      Swal.fire('Upss!','No se actualizo la imagen!','error');
    })
  }
  actualizar(){
    const {nombre, correo, unidad, rol}=this.miFormulario.value;
    this.authService.actualizarPerfil(nombre, correo,  unidad, rol).subscribe((resp:any)=>{
      
      
      if(this.authService.usuario!=undefined){
        this.authService.usuario.nombre=resp.usuario.nombre;
        this.authService.usuario.correo=resp.usuario.correo;
        this.authService.usuario.unidad=resp.usuario.unidad;
        this.authService.usuario.rol=resp.usuario.rol;
        this.authService.usuario.activo=resp.usuario.activo;
      }
      
      Swal.fire('Buen Trabajo!','Perfil Actualizado Correctamente!','success');
    })
  }
}
