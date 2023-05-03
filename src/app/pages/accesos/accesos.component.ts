import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AccesoService } from 'src/app/services/acceso.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent {

  registros:any[]=[];
  totalRegistros:number=0;
  itemOne:boolean=false;
  itemTwo:boolean=false;

  miFormulario:FormGroup = this.fb.group({
    codigo:['',[Validators.required]],

  })

  constructor(
    private fb:FormBuilder,
    private mService:ModalService,
    private acceso:AccesoService
  ){
    
  }

  
  

  directivauno(){
    this.itemOne=true;
    this.itemTwo=false;
  }
  directivados(){
    this.itemTwo=true;
    this.itemOne=false;
  }


  horaMes =(fecha:any)=>{
      const hoyMes = moment(fecha);
      return hoyMes.format('HH:mm a | MMMM Do');
  }

}
