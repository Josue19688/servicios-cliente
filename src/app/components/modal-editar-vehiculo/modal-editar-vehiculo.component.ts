import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Vehiculo } from 'src/app/models/vehiculo';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-editar-vehiculo',
  templateUrl: './modal-editar-vehiculo.component.html',
  styleUrls: ['./modal-editar-vehiculo.component.css']
})
export class ModalEditarVehiculoComponent {

  vehiculo!:Vehiculo
  miFormulario:FormGroup = this.fb.group({
    vehiculo:['',[Validators.required]],
    piloto:['',[Validators.required]],
    kmsalida:['',[Validators.required]],
    csalida:this.fb.array([this.fb.group({acompanante:['']})]),
  })
  constructor(
    public mService:ModalService,
    private fb:FormBuilder,
  ){
    this.mService.vehiculo.subscribe((resp:Vehiculo)=>{
      this.vehiculo=resp;
      console.log(resp)
    });
    
  }



  crear(){
    console.log(this.miFormulario.value)
  }


  cerrarModal(){
    this.mService.cerrarModalEditarVehiculo();
  }


  /**
   * Manejo de inputs dinamicos
   */

  getControls() {
    return (<FormArray>this.miFormulario.get('csalida')).controls;
  }
  
  add(){
    const control = <FormArray>this.miFormulario.controls['csalida'];
    control.push(this.fb.group({acompanante:[]}))
  }

  eliminar(index:any){
    const control = <FormArray>this.miFormulario.controls['csalida'];
    control.removeAt(index);
    if(control.length===0) this.add();
  }

  horaMes =(fecha:any)=>{
      const hoyMes = moment(fecha);
      return hoyMes.format('HH:mm a | MMMM Do');
  }
}
