import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Novedad } from '../models/novedad';
import { Visita } from '../models/visita';
import { Archivo } from '../models/archivo';
import { InfoResponse } from '../interface/dashboard.interface';
import { environment } from 'src/environments/environments';
import { Registro } from '../models/ingreso';
import { Vehiculo } from '../models/vehiculo';


const base_url=environment.base_url;
// const base_url=`http://localhost:5000/`;
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

  private transformNovedad(resultado:any[]):Novedad[]{
    return resultado.map(
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
  }
  private transformVisita(resultado:any[]):Visita[]{
    return resultado.map(
      visita=> new Visita(visita.id,visita.tipo,visita.puesto,visita.nombre,visita.dpi,visita.colaborador,visita.proveniente,visita.ingreso,visita.salida,visita.placa,visita.vehiculo,visita.T01UsuarioId, visita.updatedAt,visita.createdAt,visita.imagen)
    );
  }
  private transformArchivo(resultado:any[]):Archivo[]{
    return resultado.map(
      archivo=> new Archivo(
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
    )
  }


  private transformRegistro(resultado:any[]):Registro[]{
    return resultado.map(
      registro=>new Registro(
        registro.id,
        registro.codigo,
        registro.status,
        registro.createdAt,
        registro.updatedAt,
        registro.T01UsuarioId
      )
    )
  }

  private transformVehiculo(resultado:any[]):Vehiculo[]{
    return resultado.map(
      vehiculo=>new Vehiculo(
        vehiculo.id,
        vehiculo.piloto,
        vehiculo.vehiculo,
        vehiculo.kmsalida,
        vehiculo.kmingreso,
        vehiculo.status,
        vehiculo.csalida,
        vehiculo.cingreso,
        vehiculo.sede,
        vehiculo.updatedAt,
        vehiculo.createdAt,
        vehiculo.T01UsuarioId
      )
    )
  }

  buscar(
    tipo: 'usuario'|'novedad'|'visita'|'archivo'|'ingreso'|'vehiculo',
    termino:string
  ){
    const url =`${base_url}search/${tipo}/${termino}`;
    return this.http.get<any[]>(url,this.headers)
    .pipe(
      map((resp:any)=>{

        switch(tipo){
          case 'usuario':
            return this.transformUser(resp.resultado);
          case 'novedad':
            return this.transformNovedad(resp.resultado);
          case 'visita':
            return this.transformVisita(resp.resultado);
          case 'archivo':
            return this.transformArchivo(resp.resultado);
          case 'ingreso':
            return this.transformRegistro(resp.resultado);
          case 'vehiculo':
            return this.transformVehiculo(resp.resultado);
          default:
            return [];
        }

      })
    )
  }

  filtrar(
    tipo: 'usuario'|'novedad'|'visita'|'archivo'|'ingreso'|'vehiculo',
    inicio:string,
    final:string
  ){
    const body ={inicio,final};
    const url =`${base_url}search/${tipo}`;
    return this.http.post<any[]>(url,body,this.headers)
    .pipe(
      map((resp:any)=>{

        switch(tipo){
          case 'usuario':
            return this.transformUser(resp.resultado);
          case 'novedad':
            return this.transformNovedad(resp.resultado);
          case 'visita':
            return this.transformVisita(resp.resultado);
          case 'archivo':
            return this.transformArchivo(resp.resultado);
          case 'ingreso':
            return this.transformRegistro(resp.resultado);
          case 'vehiculo':
            return this.transformVehiculo(resp.resultado);
          default:
            return [];
        }

      })
    )
  }


  conteoInfo(){
    const url =`${base_url}dashboard`;
    return this.http.get<InfoResponse>(url,this.headers);
  }



}
