import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  
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

  agregar(data:any){
    const {codigo} = data;
    const status = true;
    const url=`${base_url}ingreso`;
    return this.http.post(url,{
      codigo,status
    },this.headers);
  }
  actualizar(data:any){
    const {codigo,id} = data;
    const status = true;
    const url=`${base_url}ingreso/${id}`;
    return this.http.put(url,{
      codigo,status
    },this.headers);
  }

  getRegistros(){
    const url=`${base_url}ingreso`;
    return this.http.get(url,this.headers);
  }

  deleteRegister(id:string){
    const url=`${base_url}ingreso/${id}`;
    return this.http.delete(url,this.headers);
  }

}
