import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visita } from 'src/app/models/visita';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalService } from 'src/app/services/modal.service';
import { VisitasService } from 'src/app/services/visitas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.css']
})
export class VisitasComponent implements OnInit{

  desde:any=0;
  totalVisitas:Number=0;
  visitas:Visita[]=[];
  visitasTemporal:Visita[]=[];
  respuesta:boolean=false;
  cargando:boolean=true;
  dtOptions: DataTables.Settings = {};

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
    private fb:FormBuilder,
    private visitaService:VisitasService,
    private searchService:BusquedasService,
    private mService:ModalService
  ){
    this.mService.visita.subscribe(resp=>this.getVisitas());
  }
  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getVisitas();
  }



 
  agregar(){
    this.visitaService.crearVisita(this.miFormulario.value)
    .subscribe(resp=>{
      if(resp.ok){
        Swal.fire('Buen Trabajo!','Registros creado exitosamente!','success');
      }
      this.getVisitas();
      this.miFormulario.reset();
    })
 
  }

  getVisitas(){
    this.cargando=true;
    this.visitaService.getVisitas(this.desde)
    .subscribe(({total,visitas})=>{
      
      this.totalVisitas=total;
      this.visitas=visitas;
      this.visitasTemporal=visitas;
      this.cargando=false;
    })
  }

  cambiarPagina( valor: number ) {
    console.log(valor)
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalVisitas ) {
      this.desde -= valor; 
    }
    this.getVisitas()
    
  }

  buscar(termino:string){

    if(termino.length===0){
      return this.visitas= this.visitasTemporal;
    }
    this.searchService.buscar('visita',termino)
      .subscribe((resp:Visita[]|any[])=>{
        
        this.visitas=resp;
    })
   
    return true;
    
  }

  eliminarVisita( visita:Visita ) {

    Swal.fire({
      title: '¿Borrar Visita?',
      text: `Esta a punto de borrar a ${ visita.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result:any) => {
      if (result.value) {

        this.visitaService.eliminarVisita(visita)
        .subscribe((resp:any)=>{
          this.getVisitas();
            Swal.fire(
            'Visita Borrado!',
            `${ visita.nombre} fue eliminado correctamente!`,
            'success'
          );
        })
      }
    })
    return true;
  }


  abrirModal(visita:Visita){
    this.mService.abrirModalVisita();
    this.mService.visita.emit(visita);
  }

  abrirModalEditar(visita:Visita){
    this.mService.abrirModalEditarVisita();
    this.mService.visita.emit(visita);
  }

  abrirModalArchivo(visita:Visita){
    this.mService.abrirModalArchivo();
    this.mService.visita.emit(visita);
  }
}
