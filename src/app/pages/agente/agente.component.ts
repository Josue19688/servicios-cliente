import { Component } from '@angular/core';

@Component({
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css']
})
export class AgenteComponent {
  itemOne:boolean=false;
  itemTwo:boolean=false;





  directivauno(){
    this.itemOne=true;
    this.itemTwo=false;
  }
  directivados(){
    this.itemTwo=true;
    this.itemOne=false;
  }

}
