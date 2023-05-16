import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Novedad } from 'src/app/models/novedad';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalService } from 'src/app/services/modal.service';


import { NovedadesService } from 'src/app/services/novedades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit{

  totalNovedades:Number=0;
  novedades:Novedad[]=[];
  novedadesTemp:Novedad[]=[];

  desde:any=0;
  cargando:boolean=true;

  respuesta:boolean=false;
  dtOptions: DataTables.Settings = {};

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
    private searchService:BusquedasService,
    private mService:ModalService
  ){}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getNovedades()
  }
  




  buscar(termino:string){

    if(termino.length===0){
      return this.novedades= this.novedadesTemp;
    }
    this.searchService.buscar('novedad',termino)
      .subscribe((resp:Novedad[]|any[])=>{
        
        this.novedades=resp;
    })
   
    return true;
    
  }

  agregar(){

    this.nService.newNovedad(this.miFormulario.value)
    .subscribe(resp=>{
        Swal.fire(
          'Buen Trabajo!',
          'El registro se ha creado!',
          'success'
        )
      this.getNovedades();
      this.miFormulario.reset();
     
    })
  }

  getNovedades(){
    this.cargando=true;
    
    this.nService.getNovedades()
    .subscribe(({total,novedades})=>{
      this.totalNovedades=total;
      this.novedades=novedades;
      this.novedadesTemp=novedades;
      this.cargando=false;
    })
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalNovedades ) {
      this.desde -= valor; 
    }

    this.getNovedades();
  }


  eliminarNovedad( novedad: Novedad ) {

    Swal.fire({
      title: '¿Borrar Novedad?',
      text: `Esta a punto de borrar a ${ novedad.tipo }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result:any) => {
      if (result.value) {
        this.nService.eliminarNovedad(novedad)
        .subscribe((resp:any)=>{
          this.getNovedades();
          Swal.fire(
              'Novedad borrada',
              `${ novedad.tipo} fue eliminado correctamente`,
              'success'
            );
            
        });
      }
    })

  }


  abrirModalEditar(novedad:Novedad){
    this.mService.abrirModalEditarNovedad();
    this.mService.novedad.emit(novedad);
  }
  abrirModal(novedad:Novedad){
    this.mService.abrirModal();
    this.mService.novedad.emit(novedad);
  }
  abrirModalArchivo(novedad:Novedad){
    this.mService.abrirModalArchivo();
    this.mService.novedad.emit(novedad);
    this.mService.modelo.emit('novedad');
  }
  horaMes =(fecha:any)=>{
    const hoyMes = moment(fecha);
    return hoyMes.format(' MMMM D');
  }
}
