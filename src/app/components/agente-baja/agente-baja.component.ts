import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Agente } from 'src/app/models/agente';
import { AgenteService } from 'src/app/services/agente.service';

@Component({
  selector: 'app-agente-baja',
  templateUrl: './agente-baja.component.html',
  styleUrls: ['./agente-baja.component.css']
})
export class AgenteBajaComponent implements OnInit{

  @Input() agentes:Agente[]=[];
  @Input() total :number=0;
  respuesta:boolean=false;
  @Output()
  public agente:EventEmitter<Agente> =  new EventEmitter();


  constructor(
    private sAgente:AgenteService
  ){
    
  }
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    
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
