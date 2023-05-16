import { Component, OnInit } from '@angular/core';
import { Agente } from 'src/app/models/agente';
import { AgenteService } from 'src/app/services/agente.service';

@Component({
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css']
})
export class AgenteComponent implements OnInit{
  itemOne:boolean=false;
  itemTwo:boolean=false;
  itemTree:boolean=false;
  itemFor:boolean=false;


  agentesActivos:Agente[]=[];
  agentesSuspendidos:Agente[]=[];
  agentesVacaciones:Agente[]=[];
  agentesBaja:Agente[]=[];

  agentesActivosTotal=0;
  agentesSuspendidosTotal=0;
  agentesVacacionesTotal=0;
  agentesBajaTotal=0;

  constructor(
    private sAgente:AgenteService
  ){}
  ngOnInit(): void {
    this.getAgentes();
  }

  newAgente(agente:Agente){
    if(agente){
      this.getAgentes();
    }
  }

  getAgentes(){
    this.sAgente.getAgentes()
    .subscribe((resp:any)=>{
        this.agentesActivos=resp.activos;
        this.agentesActivosTotal=resp.totalActivos;
        this.agentesSuspendidos=resp.suspendidos;
        this.agentesSuspendidosTotal=resp.totalSupendidos;
        this.agentesVacaciones=resp.vacaciones;
        this.agentesVacacionesTotal=resp.totalVacaciones;
        this.agentesBaja=resp.baja;
        this.agentesBajaTotal=resp.totalBaja;
    })
  }

  

  directivauno(){
    this.itemOne=true;
    this.itemTwo=false;
    this.itemTree=false;
    this.itemFor=false;
  }
  directivados(){
    this.itemTwo=true;
    this.itemOne=false;
    this.itemTree=false;
    this.itemFor=false;
  }

  vacaciones(){
    this.itemTwo=false;
    this.itemOne=false;
    this.itemTree=true;
    this.itemFor=false;
  }

  baja(){
    this.itemTwo=false;
    this.itemOne=false;
    this.itemTree=false;
    this.itemFor=true;
  }

}
