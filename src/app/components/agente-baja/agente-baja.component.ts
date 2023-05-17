import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Agente } from 'src/app/models/agente';
import { AgenteService } from 'src/app/services/agente.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

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
    private sAgente:AgenteService,
    private mService:ModalService
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

  eliminarAgente(agente:Agente){
    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar a ${ agente.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result:any) => {
      if (result.value) {

        this.sAgente.deleteAgente(agente)
        .subscribe(resp=>{
          this.mService.agente.emit(agente);
          Swal.fire(
            'Usuario Borrado!',
            `${ agente.nombre} fue eliminado correctamente!`,
            'success'
          );
        })
      }
    })
    return true;
  }


  abrirModal(agente:Agente){
    this.mService.abrirModalViewAgente();
    this.mService.agente.emit(agente);
  }

  abrirModalEditar(agente:Agente){
    this.mService.abrirModalEditarAgente();
    this.mService.agente.emit(agente);
  }

}
