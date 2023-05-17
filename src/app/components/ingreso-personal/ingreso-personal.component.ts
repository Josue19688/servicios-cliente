import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Registro } from 'src/app/models/ingreso';
import { AccesoService } from 'src/app/services/acceso.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-personal',
  templateUrl: './ingreso-personal.component.html'
})
export class IngresoPersonalComponent implements OnInit{

  registros:Registro[]=[];
  registrosTemporal:Registro[]=[];
  cargando:boolean=true;
  respuesta:boolean=false;

  totalRegistros:number=0;
  itemOne:boolean=false;
  itemTwo:boolean=false;

  miFormulario:FormGroup = this.fb.group({
    codigo:['',[Validators.required]],

  })
  constructor(
    private fb:FormBuilder,
    private acceso:AccesoService,
    private mService:ModalService,
    private searchService:BusquedasService,
  ){}


  ngOnInit(): void {
    this.obtener();
    this.mService.ingreso.subscribe(m=>this.obtener());
  }

  //Se creo con tipado ANY con la finalidad de modificar segun la necesidad del los datos
  crear(){
    const {codigo} = this.miFormulario.value;
    if(codigo.trim().length>0 && codigo!=null){
      this.acceso.agregar(this.miFormulario.value)
      .subscribe((resp:any)=>{
        console.log(resp)
        if(resp.ok==true){
          Swal.fire(
            'Buen Trabajo!',
            'El registro se ha creado!',
            'success'
          )
          this.obtener();
          this.miFormulario.reset();
        }else{
          Swal.fire(
            'Upss!',
            resp.msg,
            'error'
          )
          this.miFormulario.reset();
        }
        
      })
    }else{
      Swal.fire(
        'Upss!',
        'El campo no puede estar vacio!',
        'error'
      )
      this.miFormulario.reset();
    }
    
  }

  obtener(){
    this.acceso.getRegistros()
    .subscribe((resp:any)=>{
      this.registros=resp.ingresos;
      this.registrosTemporal=resp.ingresos;
      this.totalRegistros=resp.total;
    })
  }

  egreso(registro:any){
    this.acceso.actualizar(registro)
    .subscribe((resp:any)=>{
      if(resp.ok==true){
        this.obtener();
        Swal.fire(
          'Buen Trabajo!',
          'Salida agregada correctamente!',
          'success'
        )
      }
    })
  }

  eliminar(registro:any){
    const {id}= registro;
    this.acceso.deleteRegister(id)
    .subscribe((resp:any)=>{
      if(resp.ok===true){
        this.obtener();
        Swal.fire(
          'Buen Trabajo!',
          'Registro eliminado correctamente!',
          'success'
        )
      }
    })
  }


  buscar(termino:string){

    if(termino.length===0){
      return this.registros= this.registrosTemporal;
    }
    this.searchService.buscar('ingreso',termino)
      .subscribe((resp:Registro[]|any[])=>{
        this.registros=resp;
    })

    return true;

  }
  

  horaMes =(fecha:any)=>{
      const hoyMes = moment(fecha);
      return hoyMes.format('HH:mm a | MMMM Do');
  }



}
