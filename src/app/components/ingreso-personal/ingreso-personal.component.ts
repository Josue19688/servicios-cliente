import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccesoService } from 'src/app/services/acceso.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-personal',
  templateUrl: './ingreso-personal.component.html'
})
export class IngresoPersonalComponent implements OnInit{

  miFormulario:FormGroup = this.fb.group({
    codigo:['',[Validators.required]],

  })

  constructor(
    private fb:FormBuilder,
    private acceso:AccesoService,
    private mService:ModalService,
  ){}


  ngOnInit(): void {
    
  }


  
  //Se creo con tipado ANY con la finalidad de modificar segun la necesidad del los datos
  crear(){
    const {codigo} = this.miFormulario.value;
    if(codigo.trim().length>0 && codigo!=null){
      this.acceso.agregar(this.miFormulario.value)
      .subscribe((resp:any)=>{
        this.mService.ingreso.emit(resp);
        if(resp.ok==true){
          Swal.fire(
            'Buen Trabajo!',
            'El registro se ha creado!',
            'success'
          )
          
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


}
