import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NovedadesResponse,Novedad, NewNovedadesResponse } from '../interface/novedades.interface';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {

  private base_url='http://localhost:5000/api/';

  constructor(
    private http:HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDAwZTA2MzE0ODYzNGQ2NTNhNmY2YzIiLCJpYXQiOjE2ODAyMDc3OTUsImV4cCI6MTY4MDI5NDE5NX0.yBiQW7AZKEWE-hmov5fykLaubZm_IhNuKTiW1funNzM';
  }

  

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getNovedades(desde:Number=0):Observable<NovedadesResponse>{
    const url=`${this.base_url}novedad`;
    return this.http.get<NovedadesResponse>(url,this.headers);
  }

  newNovedad (data:any){
    const{tipo,hora,fecha,puesto,preliminar,descripcion} =  data;
    const url=`${this.base_url}novedad`;
    return this.http.post<NewNovedadesResponse>(url,{
      tipo,hora,fecha,puesto,preliminar,descripcion
    },this.headers);
  }

  eliminarNovedad(novedad:Novedad){
    const {uid}= novedad;
    const url=`${this.base_url}novedad/${uid}`;
    return this.http.delete(url,this.headers);
  }
}
