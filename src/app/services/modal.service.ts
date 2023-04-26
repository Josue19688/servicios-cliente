
import { EventEmitter, Injectable } from '@angular/core';
import { Novedad } from '../models/novedad';
import { Visita } from '../models/visita';
import { Archivo } from '../models/archivo';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _ocultarModal:boolean=true;
  private _ocultarModalEditar:boolean=true;
  private _ocultarModalVisita:boolean=true;
  private _ocultarModalEditarVisita:boolean=true;
  private _ocultarModalArchivos:boolean=true;
  private _ocultarModalEditarArchivo:boolean=true;

  //subida de archivos varios modelos
  private _ocultarModalArchivo:boolean=true;



  public novedad:EventEmitter<Novedad> = new EventEmitter<Novedad>();
  public visita:EventEmitter<Visita> = new EventEmitter<Visita>();
  public archivo:EventEmitter<Archivo>=new EventEmitter<Archivo>();

  public imagen:EventEmitter<string>=new EventEmitter<string>();
  public modelo:EventEmitter<string>=new EventEmitter<string>();

  //este observable me puedo suscribir a el donde quiera
  public menuDesplegable : EventEmitter<string> = new EventEmitter<string>();
  public menuActivo:  EventEmitter<string> = new EventEmitter<string>();
  public ingreso : EventEmitter<string>=new EventEmitter<string>();

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


   /**
   * Manipular clases para ocultar el modal
   */
  get ocultarModal(){
    return this._ocultarModal;
  }
  get ocultarModalEditar(){
    return this._ocultarModalEditar;
  }

  get ocultarModalArchivo(){
    return this._ocultarModalArchivo;
  }

  get ocultarModalVisita(){
    return this._ocultarModalVisita;
  }
  get ocultarModalEditarVisita(){
    return this._ocultarModalEditarVisita;
  }

  get ocultarModalArchivos(){
    return this._ocultarModalArchivos;
  }

  get ocultarModalEditarArchivo(){
    return this._ocultarModalEditarArchivo;
  }

 
  /**
   * Manejo Modal Subida Archivos
   */

  abrirModalArchivo(){
    this._ocultarModalArchivo=false;
  }
  cerrarModalArchivo(){
    this._ocultarModalArchivo=true;
  }

   /**
   * MOdales Novedades
   */

  abrirModal(){
    
    this._ocultarModal=false;
  }
  cerrarModal(){
    this._ocultarModal=true;
  }

  abrirModalEditarNovedad(){
    this._ocultarModalEditar=false;
  }
  cerrarModalEditarNovedad(){
    this._ocultarModalEditar=true;
  }


  /**
   * Modales Visita
   */
  abrirModalVisita(){
    this._ocultarModalVisita=false;
  }
  cerrarModalVisita(){
   this._ocultarModalVisita=true;
  }

  abrirModalEditarVisita(){
    this._ocultarModalEditarVisita=false;
  }
  cerrarModalEditarVisita(){
    this._ocultarModalEditarVisita=true;
  }

  
   /**
   * Modales Archivos
   */

  abrirModalArchivos(){
    this._ocultarModalArchivos=false;
  }
  cerrarModalArchivos(){
    this._ocultarModalArchivos=true;
  }

  abrirModalEditarArchivo(){
    this._ocultarModalEditarArchivo=false;
  }
  cerrarModalEditarArchivo(){
    this._ocultarModalEditarArchivo=true;
  }

  constructor() { 
    
  }


}
