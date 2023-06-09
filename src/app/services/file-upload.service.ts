import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';


const base_url =`${environment.base_url}uploads`;  

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  


  async actualizarFoto(
    archivo:File,
    tipo:'usuario'|'novedad'|'archivo'|'visita',
    id:Number
  ){
    try{
      const url=`${base_url}/${tipo}/${id}`;
      const formData =  new FormData();
      formData.append('archivo',archivo);

      const resp= await fetch(url,{
        method:'PUT',
        headers:{
          'x-token':this.token
        },
        body:formData
      });
      const data = await resp.json();

      if(data.ok){
        return data.nombre;
      }else{
        return false;
      }
     
  
    }catch(error){
      console.log(error);
      return false;
    }
  }
}
