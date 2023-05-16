import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Archivo } from 'src/app/models/archivo';
import { ArchivoService } from 'src/app/services/archivo.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit{

  totalArchivos:Number=0;
  archivos:Archivo[]=[];
  archivosTemporal:Archivo[]=[];
  desde:any=0;
  cargando:boolean=true;
  respuesta:boolean=false;
  dtOptions: DataTables.Settings = {};

  
  miFormulario:FormGroup = this.fb.group({
    tipo:['',[Validators.required]],
    origen:['',[Validators.required]],
    unidad:['',[Validators.required]],
    numero:['',[Validators.required]],
    fecha:['',[Validators.required]],
    descripcion:['']
  })

  constructor(
    private fb:FormBuilder,
    private archivoService:ArchivoService,
    private mService:ModalService,
    private searchService:BusquedasService
  ){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getArchivos();
  }

  agregar(){
    this.archivoService.crearArchivo(this.miFormulario.value)
    .subscribe(resp=>{
      if(resp.ok==true){
        this.getArchivos();
        Swal.fire('Buen Trabajo!','Registro Agregado Correctamente!', 'success');
        this.miFormulario.reset();
      }else{
        Swal.fire('Upss!','No se agrego el registro!', 'error');
      }
    }); 
  }

  getArchivos(){
    this.cargando=true;
    this.archivoService.getArchivos()
    .subscribe(({total,archivos})=>{
      this.totalArchivos=total;
      this.archivos=archivos;
      this.archivosTemporal=archivos;
      this.cargando=false;
    })
  }
  buscar(termino:string){
    if(termino.length===0){
      return this.archivos= this.archivosTemporal;
    }
    this.searchService.buscar('archivo',termino)
      .subscribe((resp:Archivo[]|any[])=>{
        this.archivos=resp;
    })
    return true;
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalArchivos ) {
      this.desde -= valor; 
    }

    this.getArchivos();
  }

  eliminarArchivo( archivo:Archivo ) {

    Swal.fire({
      title: '¿Borrar Archivo?',
      text: `Esta a punto de borrar a ${ archivo.tipo }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result:any) => {
      if (result.value) {
       this.archivoService.deleteArchivo(archivo)
       .subscribe((resp:any)=>{
        if(resp.ok===true){
          this.getArchivos();
          Swal.fire('Buen Trabajo!','Registro eliminado correctamente.','success');
        }else{
          Swal.fire('Upss!','No se elimino el registro.','error');
        }
       })
      }
    })
  }

  abrirModal(archivo:Archivo){
    this.mService.abrirModalArchivos();
    this.mService.archivo.emit(archivo);
    this.mService.modelo.emit('archivo');
  }

  abrirModalEditar(archivo:Archivo){
    this.mService.abrirModalEditarArchivo();
    this.mService.archivo.emit(archivo);
  }

  abrirModalArchivo(archivo:Archivo){
    this.mService.abrirModalArchivo();
    this.mService.archivo.emit(archivo);
    this.mService.modelo.emit('archivo');
  }

}
