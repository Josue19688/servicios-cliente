import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AccesoService } from 'src/app/services/acceso.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-vehiculo',
  templateUrl: './ingreso-vehiculo.component.html',
  styleUrls: ['./ingreso-vehiculo.component.css']
})
export class IngresoVehiculoComponent implements OnInit{
  
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
    this.mService.vehiculo.subscribe(resp=>this.obtener());
  }
  ngOnInit(): void {
    this.obtener();
  }

 
  crear(){
    
    const {vehiculo, piloto, kmsalida,csalida} = this.miFormulario.value;
    let codigo = csalida.map((item:any)=>item.acompanante);
    let codigos = codigo.toString();
    const data ={vehiculo,piloto,kmsalida,csalida:codigos};
    
    this.acceso.registrarVehiculo(data)
    .subscribe(resp=>{
      if(resp.ok){
        this.obtener();
        this.miFormulario.reset();
        Swal.fire('Buen trabajo!!','Registro creado exitosamente!','success');
      }else{
        let msg=resp.vehiculo;
        this.miFormulario.reset();
        Swal.fire('Error',msg.toString(),'error');
      }
      
    })
  }

  obtener(){
    this.acceso.obtenerVehiculos().subscribe((resp)=>{
      this.registros= resp.vehiculos;
      this.totalRegistros=resp.total
    })
  }

  
  
  egreso(item:Vehiculo){
    this.mService.abrirModalEditarVehiculo();
    this.mService.vehiculo.emit(item);
  }
  eliminarVehiculo(item:any){
    const {id}= item;
    this.acceso.aliminarVehiculo(id).subscribe(resp=>{
      if(resp.ok){
        this.obtener();
        Swal.fire('Buen Trabajo!!',resp.msg.toString(),'success')
      }else{
        Swal.fire('Upss!!','No se elimino el registro.','success')
      }
    })
  }


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
