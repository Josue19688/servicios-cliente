import { Injectable } from '@angular/core';

const base_url=`http://localhost:5000/uploads`;

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
