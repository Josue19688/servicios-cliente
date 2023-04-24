import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agentes-suspendidos',
  templateUrl: './agentes-suspendidos.component.html',
  styleUrls: ['./agentes-suspendidos.component.css']
})
export class AgentesSuspendidosComponent implements OnInit{

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
}
