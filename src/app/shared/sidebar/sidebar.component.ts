import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarClass:string;
  movileClass:string;
  usuario:any;

  constructor(
    private mService:ModalService,
    private authService:AuthService
    ) {
  
    this.movileClass='';
    this.sidebarClass='';
    this.usuario=this.authService.usuario;
   }
  ngOnInit(): void {
    this.mService.menuDesplegable.subscribe(resp=>{
      this.sidebarClass=resp;
    });
    this.mService.menuActivo.subscribe(resp=>{
      this.movileClass=resp;
    })
  }

  
  //TODO: La funcionalidad nativa del framework no funciono para movile
  /**
   * Se agrego la clase navbar-movile ya que angular no la detectava
   * se creo el metodo movile();void y para eliminar la clase se creo el metodo
   * movileSalir():void
   */

  movilDesactivar(){
    
    this.mService.menuDesplegable.emit('');
    this.mService.menuActivo.emit('');
    this.movileSalir();
  }

  movileSalir():void{
    this.movileClass='';
    this.sidebarClass='';
  }

}
