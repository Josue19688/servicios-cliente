import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Novedad } from 'src/app/interface/novedades.interface';
import { ModalService } from 'src/app/services/modal.service';
import { NovedadesService } from 'src/app/services/novedades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit{

  totalNovedades:Number=0;
  novedades:Novedad[]=[];
  novedadesTemp:Novedad[]=[];

  desde:any=0;
  cargando:boolean=true;


  constructor(
    private fb:FormBuilder,
    private nService : NovedadesService,
    public modalService:ModalService
  ){}

  ngOnInit(): void {
    ///this.modalService.nuevaNovedad.emit('nueva clase');
    this.getNovedades()
  }
  

  getNovedades(){
    this.cargando=true;
    this.nService.getNovedades(this.desde)
    .subscribe(({total,novedad})=>{
      this.totalNovedades=total;
      this.novedades=novedad;
      this.novedadesTemp=novedad;
      this.cargando=false;
    })
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalNovedades ) {
      this.desde -= valor; 
    }

    this.getNovedades();
  }


  eliminarNovedad( novedad: Novedad ) {

    Swal.fire({
      title: '¿Borrar Novedad?',
      text: `Esta a punto de borrar a ${ novedad.tipo }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result:any) => {
      if (result.value) {
        this.nService.eliminarNovedad(novedad)
        .subscribe((resp:any)=>{
          this.getNovedades();
          Swal.fire(
              'Novedad borrada',
              `${ novedad.tipo} fue eliminado correctamente`,
              'success'
            );
            
        });
      }
    })

  }

  abrirModal(){
    this.modalService.abrirModal();
  }

  
}
