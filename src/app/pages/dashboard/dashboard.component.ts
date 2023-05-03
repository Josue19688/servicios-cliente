import { Component, OnInit } from '@angular/core';
import { InfoResponse } from 'src/app/interface/dashboard.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Color,  LegendPosition,  ScaleType } from '@swimlane/ngx-charts';


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


  /**
   * 
   * Manejo de graficos con ngx charts
   * 
   */

  
  view:[number,number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Modulo';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Conteo';
  legendTitle: string = 'Years';

  
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;


  colorScheme:Color = {
    domain: ['#1b325f', '#9cc4e4', '#e9f2f9', '#3a89c9','#f26c4f'],
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
  };

  
  


  constructor(
    private searchService:BusquedasService,
    private authService:AuthService
  ){
    //Object.assign(this, { single);
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
  data = [
    {
      "name": "Usuarios",
      "value": 10
    },
    {
      "name": "Novedades",
      "value": 5
    },
    {
      "name": "Visitas",
      "value": 3
    },
    {
      "name": "Archivos",
      "value": 11
    }
  ];
 
 

}
