import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AccesoService } from 'src/app/services/acceso.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-editar-vehiculo',
  templateUrl: './modal-editar-vehiculo.component.html',
  styleUrls: ['./modal-editar-vehiculo.component.css']
})
export class ModalEditarVehiculoComponent {

  vehiculo!:Vehiculo
  miFormulario:FormGroup = this.fb.group({
    kmingreso:['',[Validators.required]],
    cingreso:this.fb.array([this.fb.group({acompanante:['']})]),
  })
  constructor(
    public mService:ModalService,
    private fb:FormBuilder,
    private acceso:AccesoService
  ){
    this.mService.vehiculo.subscribe((resp:Vehiculo)=>{
      this.vehiculo=resp;
    });
    
  }



  crear(){
    const {kmingreso,cingreso} = this.miFormulario.value;
    let codigo = cingreso.map((item:any)=>item.acompanante);
    let codigos = codigo.toString();
    const data ={kmingreso,cingreso:codigos};
    const {id} = this.vehiculo;
    this.acceso.editarVehiculo(data,id.toString())
    .subscribe((resp)=>{
      if(resp.ok){
        const {msg} = resp;
        this.mService.vehiculo.emit(msg);
        this.miFormulario.reset()
        this.cerrarModal();
        Swal.fire('Buen Trabajo!!','Registro Actualizado.','success');
      }else{
        Swal.fire('Error','No se actualizo el registro.','error');
        this.miFormulario.reset()
        this.cerrarModal();
      }
      

    })
  }


  cerrarModal(){
    this.mService.cerrarModalEditarVehiculo();
  }


  /**
   * Manejo de inputs dinamicos
   */

  getControls() {
    return (<FormArray>this.miFormulario.get('cingreso')).controls;
  }
  
  add(){
    const control = <FormArray>this.miFormulario.controls['cingreso'];
    control.push(this.fb.group({acompanante:[]}))
  }

  eliminar(index:any){
    const control = <FormArray>this.miFormulario.controls['cingreso'];
    control.removeAt(index);
    if(control.length===0) this.add();
  }

  horaMes =(fecha:any)=>{
      const hoyMes = moment(fecha);
      return hoyMes.format('HH:mm a | MMMM Do');
  }
}
