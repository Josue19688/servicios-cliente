import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedasService } from 'src/app/services/busquedas.service';


import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  
  usuarios:Usuario[]=[];
  totalUsuarios:Number=0;
  usuariosTemporal:Usuario[]=[];
  desde:any=0;
  cargando:boolean=true;
  respuesta:boolean=false;
  dtOptions: DataTables.Settings = {};



  miFormulario:FormGroup=this.fb.group({
    nombre:['',[Validators.required]],
    correo:['',[Validators.required]],
    contrasena:['',[Validators.required]],
    unidad:['',[Validators.required]]
  })

  constructor(
    private fb:FormBuilder,
    private userService:UsuarioService,
    private searchService:BusquedasService,
    private authService:AuthService
  ){}
 
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getUsuarios();
  }


  crearUsuario(){
    const {nombre, correo, contrasena, unidad} = this.miFormulario.value;
    this.userService.createUser(nombre, correo, contrasena, unidad)
    .subscribe(resp=>{
      
      this.getUsuarios();
      if(resp.ok){
        this.miFormulario.reset();
        Swal.fire('Buen Trabajo!','Registro agregado correctamente','success');
      }
    },err=>{
      if(err.error){
       
        Swal.fire('Error',`${err.error.errors[0].msg}`,'error');
      }
    })
  }

  getUsuarios (){
    this.cargando=true;
    this.userService.getUser(this.desde)
    .subscribe(({total,usuarios})=>{
      this.totalUsuarios=total;
      this.usuarios=usuarios;
      this.usuariosTemporal=usuarios;
      this.cargando=false;
     
    })
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor; 
    }

    this.getUsuarios();
  }


  eliminarUsuario(usuario:any){

    if(usuario.id===this.authService.usuario?.id){
      return Swal.fire('Upss!','No puedes eliminarte!','error');
    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result:any) => {
      if (result.value) {

        this.userService.deleteUsuario(usuario)
        .subscribe((resp:any)=>{
          this.getUsuarios();
          Swal.fire(
            'Usuario Borrado!',
            `${ usuario.nombre} fue eliminado correctamente!`,
            'success'
          );
        })
      }
    })
    return true;

  }

  buscar(termino:string){

    if(termino.length===0){
      return this.usuarios= this.usuariosTemporal;
    }
    this.searchService.buscar('usuario',termino)
      .subscribe((resp:Usuario[] | any[])=>{
        this.usuarios=resp;
    })
   
    return true;
    
  }

  cambiarRol(usuario:Usuario){

    if(usuario.id===this.authService.usuario?.id){
      return Swal.fire('Upss!','No se puede cambiar el Rol asignado a su usuario!','error');
    }
    this.userService.actualizarUsuario(usuario)
    .subscribe((resp:any)=>{
      if(resp.ok){
        this.respuesta=true;
      }
    })

    setTimeout(() => {
      return this.respuesta=false;
    },3000);
    return true;
  }

  cambiarEstado(usuario:Usuario){

    if(usuario.id===this.authService.usuario?.id){
      return Swal.fire('Upss!','No se puede cambiar el Estado!','error');
    }

    this.userService.actualizarUsuario(usuario)
    .subscribe((resp:any)=>{
      if(resp.ok){
        this.respuesta=true;
      }
    })

    setTimeout(() => {
      return this.respuesta=false;
    },3000);
    return true;
  }

 

}
