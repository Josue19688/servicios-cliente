import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { NovedadesResponse, NewNovedadesResponse, UpdateNovedadResponse } from '../interface/novedades.interface';
import { Novedad } from '../models/novedad';
import { ModalService } from './modal.service';
import { environment } from 'src/environments/environments';



const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class NovedadesService implements OnInit{

  

  constructor(
    private http:HttpClient,
    public modalService:ModalService,
  ) { 
    this.modalService.novedad
    .subscribe(resp =>this.getNovedades() );
  }
  ngOnInit(): void {
    this.getNovedades()
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getNovedades(desde:Number=0){
    const url=`${base_url}novedad`;
    return this.http.get<NovedadesResponse>(url,this.headers)
    .pipe(
      map(resp=>{
        const novedades =  resp.novedades.map(
        novedad=> new Novedad(
          novedad.id,
          novedad.tipo,
          novedad.hora,
          novedad.fecha,
          novedad.puesto, 
          novedad.preliminar,
          novedad.descripcion,
          novedad.T01UsuarioId,
          novedad.createdAt,
          novedad.updatedAt,
          novedad.imagen,
          )
        );
        return {
          total:resp.total,
          novedades
        }
      })
    )
  }

  newNovedad (data:Novedad){
    const{tipo,hora,fecha,puesto,preliminar,descripcion} =  data;
    const url=`${base_url}novedad`;
    return this.http.post<NewNovedadesResponse>(url,{
      tipo,hora,fecha,puesto,preliminar,descripcion
    },this.headers);
  }
  actualizarNovedad(id:any,novedad:Novedad){
    const{tipo,hora,fecha,puesto,preliminar,descripcion} =  novedad;
    const url=`${base_url}novedad/${id}`;
    return this.http.put<UpdateNovedadResponse>(url,{
      tipo,hora,fecha,puesto,preliminar,descripcion
    },this.headers);
  }

  eliminarNovedad(novedad:Novedad){
    const {id}= novedad;
    const url=`${base_url}novedad/${id}`;
    return this.http.delete(url,this.headers);
  }
}
