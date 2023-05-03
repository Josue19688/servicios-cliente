import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AccesoService } from 'src/app/services/acceso.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-vehiculo',
  templateUrl: './ingreso-vehiculo.component.html'
})
export class IngresoVehiculoComponent {
  
  registros:any[]=[];
  totalRegistros:number=0;
  itemOne:boolean=false;
  itemTwo:boolean=false;

  miFormulario:FormGroup = this.fb.group({
    vehiculo:['',[Validators.required]],
    piloto:['',[Validators.required]],
    kmsalida:['',[Validators.required]],
    csalida:this.fb.array([this.fb.group({acompanante:['']})]),
  })

  constructor(
    private fb:FormBuilder,
    private mService:ModalService,
    private acceso:AccesoService
  ){
    
  }

 
 crear(){

 }

 get getCodigos(){
  return this.miFormulario.get('csalida') as FormArray;
 }
 
 add(){
   const control = <FormArray>this.miFormulario.controls['csalida'];
   control.push(this.fb.group({acompanante:[]}))
 }

  horaMes =(fecha:any)=>{
      const hoyMes = moment(fecha);
      return hoyMes.format('HH:mm a | MMMM Do');
  }

}
