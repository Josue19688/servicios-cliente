
import { EventEmitter, Injectable } from '@angular/core';
import {  Novedad } from '../interface/novedades.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _ocultarModal:boolean=true;
  public nuevaNovedad:EventEmitter<Novedad> = new EventEmitter<Novedad>();



  //este observable me puedo suscribir a el donde quiera
  public menuDesplegable : EventEmitter<string> = new EventEmitter<string>();
  public menuActivo:  EventEmitter<string> = new EventEmitter<string>();

  private menu:boolean=false;

  
  get agregarClase (){
    return this.menu;
  }

  activarMenu(){
    return this.menu=true;
  }

  desactivarMenu(){
    return this.menu=false;
  }









  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(){
    this._ocultarModal=false;
  }

  cerrarModal(){
    this._ocultarModal=true;
  }
  constructor() { }


}
