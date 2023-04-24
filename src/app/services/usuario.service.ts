import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Usuario, UsuarioGetResponse, UsuarioResponse } from '../interface/usuario.interface';
import { Usuario as UsuarioModelo } from '../models/usuario';
import { environment } from 'src/environments/environments';


const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



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

  createUser(nombre:string, correo:string, contrasena:string, unidad:string){
    const url =`${base_url}usuario`;
    const body={nombre, correo, contrasena, unidad};
    return this.http.post<UsuarioResponse>(url,body,this.headers);
  }

  getUser(desde:Number=0){
    const url =`${base_url}usuario?desde=${desde}`;
    return this.http.get<UsuarioGetResponse>(url,this.headers)
    .pipe(
      map(resp=>{
        const usuarios =  resp.usuarios.map(
          user=> new UsuarioModelo(user.id,user.nombre,user.correo, '',user.activo!,user.imagen!,null,user.unidad,user.rol,user.createdAt,user.updatedAt)
        );
        return {
          total:resp.total,
          usuarios
        }
      })
    )
  }

  actualizarUsuario(usuario:UsuarioModelo){
    const {id,nombre,correo,activo,unidad,rol}=usuario;
    const body ={nombre, correo, activo, unidad, rol};
    const url=`${base_url}usuario/${id}`;
    return this.http.put(url,body,this.headers);
  }
 

  deleteUsuario(usuario:Usuario){
    const {id}= usuario;
    const url=`${base_url}usuario/${id}`;
    return this.http.delete(url,this.headers);
  }

  

}
