import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario';

const base_url=`http://localhost:5000/search`;
//http://localhost:5000/search/usuario/a

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {


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


  private transformUser(resultado:any[]):Usuario[]{
    return resultado.map(
      user=> new Usuario(user.id,user.nombre,user.correo, '',user.activo!,user.imagen!,null,user.unidad,user.rol,user.createdAt,user.updatedAt)
    );
  }


  buscar(
    tipo: 'usuario'|'novedad'|'visita'|'archivo',
    termino:string
  ){
    const url =`${base_url}/${tipo}/${termino}`;
    return this.http.get<any[]>(url,this.headers)
    .pipe(
      map((resp:any)=>{

        switch(tipo){
          case 'usuario':
            return this.transformUser(resp.resultado);
            break;
          default:
            return [];
        }

      })
    )
  }

}
