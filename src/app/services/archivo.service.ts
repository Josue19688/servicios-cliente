import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Archivo } from '../models/archivo';
import { ArchivoResponse, NewArchivoInterface, UpdateArchivo } from '../interface/archivo.interface';
import { map } from 'rxjs';
import { environment } from 'src/environments/environments';

const base_url=environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

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

  
  crearArchivo(archivo:Archivo){
    const url = `${base_url}archivo`;
    return this.http.post<NewArchivoInterface>(url,archivo,this.headers);
  }

  updateArchivo(archivo:Archivo,id:any){
    const url = `${base_url}archivo/${id}`;
    return this.http.put<UpdateArchivo>(url,archivo,this.headers);
  }
  getArchivos(){
    const url=`${base_url}archivo`;
    return this.http.get<ArchivoResponse>(url,this.headers)
    .pipe(
      map(resp=>{
        const archivos  =  resp.archivos.map(
          archivo=>new Archivo(
            archivo.id,
            archivo.tipo,
            archivo.numero,
            archivo.fecha,
            archivo.origen,
            archivo.unidad,
            archivo.descripcion,
            archivo.T01UsuarioId,
            archivo.updatedAt,
            archivo.createdAt,
            archivo.imagen!,
            archivo.imagenes!
            )
        );
        return {
          total:resp.total,
          archivos
        }
      })
    )
  }

  deleteArchivo(archivo:Archivo){
    const {id}= archivo;
    const url = `${base_url}archivo/${id}`;
    return this.http.delete(url,this.headers);
  }

}
