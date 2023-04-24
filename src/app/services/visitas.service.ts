import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visita } from '../models/visita';
import { NewVisitaResponse, UpdateVisitaResponse, VisitaResponse } from '../interface/visita.interface';
import { map } from 'rxjs';
import { environment } from 'src/environments/environments';

const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  
  constructor(
    private http:HttpClient
  ) { }


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


  crearVisita(visita:Visita){
    const url =`${base_url}visita`;
    return this.http.post<NewVisitaResponse>(url,visita,this.headers);
  }


  getVisitas(desde:Number=0){
    const url=`${base_url}visita`;
    return this.http.get<VisitaResponse>(url,this.headers)
    .pipe(
      map(resp=>{
        const visitas =  resp.visitas.map(
        visita=> new Visita(visita.id,visita.tipo, visita.puesto,visita.nombre,visita.dpi,visita.colaborador,visita.proveniente,visita.ingreso,visita.salida,visita.placa,visita.vehiculo,visita.T01UsuarioId, visita.updatedAt,visita.createdAt,visita.imagen)
        );
        return {
          total:resp.total,
          visitas
        }
      })
    )
  }

  updateVisita(id:any,visita:Visita){
    const url=`${base_url}visita/${id}`;
    return this.http.put<UpdateVisitaResponse>(url,visita,this.headers);
  }

  eliminarVisita(visita:Visita){
    const {id} = visita;
    const url=`${base_url}visita/${id}`;
    return this.http.delete(url,this.headers);
  }
}
