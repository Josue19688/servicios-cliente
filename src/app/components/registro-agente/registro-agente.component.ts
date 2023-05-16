import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agente } from 'src/app/models/agente';
import { AgenteService } from 'src/app/services/agente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-agente',
  templateUrl: './registro-agente.component.html',
  styleUrls: ['./registro-agente.component.css']
})
export class RegistroAgenteComponent implements OnInit{





  @Input() agentes: Agente[]=[];
  @Input() total :number=0;
  respuesta:boolean=false;
  @Output()
  public agente:EventEmitter<Agente> =  new EventEmitter();




  miFormulario:FormGroup=this.fb.group({
    nombre:['',[Validators.required]],
    dpi:['',[Validators.required,Validators.min(13),Validators.max(13)]],
    telefono:['',[Validators.required,Validators.maxLength(8)]],
    correo:['',[Validators.required,Validators.email]],
    nacimiento:['',[Validators.required]],
    direccion:['',[Validators.required]],
    igss:['',[Validators.required]],
    nit:['',[Validators.required]],
    sangre:['',[Validators.required]],
    puesto:['',[Validators.required]],
    grupo:['',[Validators.required]],
    status:['',[Validators.required]],
  })
  dtOptions: DataTables.Settings = {};



  constructor(
    private fb:FormBuilder,
    private sAgente:AgenteService
  ){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    
  }

  agregar(){
    this.sAgente.postAgente(this.miFormulario.value)
    .subscribe(resp=>{
      if(resp.ok){

        this.agente.emit(this.miFormulario.value);
        this.miFormulario.reset()
        Swal.fire('Buen Trabajo!!','Registro creado exitosamente!','success');
      }else{
        this.miFormulario.reset();
        Swal.fire('Error',resp.respuesta.toString(),'error');
      }
      
    })
  }

  cambiarEstado(agente:Agente){
    this.sAgente.updateAgente(agente)
    .subscribe(resp=>{
      if(resp.ok){
        this.respuesta=true;
        this.agente.emit(agente);
      }
    })
    
    setTimeout(() => {
      return this.respuesta=false;
    },3000);
    
    return true;
  }

  

 

}
