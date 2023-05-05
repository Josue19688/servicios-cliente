import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agente } from '../models/agente';
import { environment } from 'src/environments/environments';
import { ActualizarAgenteResponse, CrearAgenteResponse, DeleteAgenteResponse, ObtenerAgenteResponse } from '../interface/agente.interface';


const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

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

  postAgente(agente:Agente){
    const url=`${base_url}agente`;
    return this.http.post<CrearAgenteResponse>(url,agente,this.headers);
  }

  updateAgente(agente:Agente,id:any){
    const url=`${base_url}agente/${id}`;
    return this.http.put<ActualizarAgenteResponse>(url,agente,this.headers);
  }

  deleteAgente(id:any){
    const url=`${base_url}agente/${id}`;
    return this.http.delete<DeleteAgenteResponse>(url,this.headers);
  }

  getAgentes(){
    const url=`${base_url}agente`;
    return this.http.get<ObtenerAgenteResponse>(url,this.headers);
  }

}
