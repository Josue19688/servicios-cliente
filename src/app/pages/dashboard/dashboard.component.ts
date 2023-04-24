import { Component, OnInit } from '@angular/core';
import { InfoResponse } from 'src/app/interface/dashboard.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedasService } from 'src/app/services/busquedas.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  totalUsuarios:number=0;
  totalNovedades:number=0;
  totalArchivos:number=0;
  totalVisitas:number=0;
  usuario:any;
  constructor(
    private searchService:BusquedasService,
    private authService:AuthService
  ){
    if(this.authService.usuario){
      this.usuario= this.authService.usuario;
    }
  }
  ngOnInit(): void {
    this.conteo();
  }

  conteo(){
    this.searchService.conteoInfo()
    .subscribe((resp:InfoResponse)=>{
      this.totalUsuarios=resp.usuario;
      this.totalNovedades=resp.novedad;
      this.totalArchivos=resp.archivo;
      this.totalVisitas=resp.visita;
    })
  }

}
