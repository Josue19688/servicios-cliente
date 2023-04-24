import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, User } from '../interface/auth.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environments';

const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario?:Usuario;
  isLogin:boolean = false;
  roleAs:string='';

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
    
    const url=`${base_url}${id}`;
    
   
    const body ={nombre, correo, activo, unidad, rol};

    return this.http.put(url,body,{
      headers:{
        'x-token':this.token
      }
    })
  }

  login(correo:string, contrasena:string){
    const url = `${base_url}auth`;
    const body = {correo,contrasena};
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      map(resp=>{
        this.isLogin=true;
        this.roleAs=resp.response.user.rol;
        localStorage.setItem('ROLE', this.roleAs);
        localStorage.setItem('STATE', 'true');
        localStorage.setItem('token',resp.response.token);
        return true;
      }),
      catchError(err=>of(false))
    )
  }


  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    const url = `${base_url}auth`;
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

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.roleAs = localStorage.getItem('ROLE') || '';
    return this.roleAs;
  }


}
