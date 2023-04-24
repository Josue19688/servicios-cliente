import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro-agente',
  templateUrl: './registro-agente.component.html',
  styleUrls: ['./registro-agente.component.css']
})
export class RegistroAgenteComponent implements OnInit{
  miFormulario:FormGroup=this.fb.group({

  })
  dtOptions: DataTables.Settings = {};



  constructor(
    private fb:FormBuilder
  ){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  agregar(){
    console.log('agregar datos')
  }

 

}
