import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, User } from '../interface/auth.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario?:Usuario;

  constructor(private http:HttpClient) { }

  


  get token():string{
    return localStorage.getItem('token') || '';
  }

 

  actualizarPerfil(nombre:string, correo:string, unidad:string, rol:string){
    
    let id;
    let activo;
    if(this.usuario!=undefined){
      id=this.usuario.id;
      activo = this.usuario.activo;
    }
    
    const url=`http://localhost:5000/usuario/${id}`;
    
   
    const body ={nombre, correo, activo, unidad, rol};

    return this.http.put(url,body,{
      headers:{
        'x-token':this.token
      }
    })
  }

  login(correo:string, contrasena:string){
    const url = `http://localhost:5000/auth`;
    const body = {correo,contrasena};
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      map(resp=>{
        localStorage.setItem('token',resp.response.token);
        return true;
      }),
      catchError(err=>of(err.error.msg))
    )
  }



  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    const url = `http://localhost:5000/auth`;
    return this.http.get(url,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
        const {
          id,
          nombre,
          correo,
          contrasena,
          activo,
          imagen,
          token,
          unidad,
          rol,
          createdAt,
          updatedAt,
        } = resp.usuario;
        this.usuario= new Usuario(
            id,
            nombre,
            correo,
            '',
            activo,
            imagen,
            token,
            unidad,
            rol,
            createdAt,
            updatedAt,
        );
      }),
      map(resp=>true),
      catchError(error=>of(false))
    )
  }
}
