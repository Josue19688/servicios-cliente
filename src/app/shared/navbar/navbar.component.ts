import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activo:boolean=false;
  menuActiveClass:string;
 usuario:any;
  
  constructor(
    private router:Router,
    private mService:ModalService,
    private authService:AuthService
  ){
    this.menuActiveClass='';
    if(this.authService.usuario){
      this.usuario= this.authService.usuario;
    }
    
    
  }

 


  ngOnInit(): void {
   this.mService.menuActivo.subscribe(resp=>{
    this.menuActiveClass=resp;
   });
  
  }


 

  menuDesplegable(){
    this.movilActivar();
    this.menuActiveClass='active';
  }

  movilActivar(){
    this.mService.menuDesplegable.emit('active-sidemenu-area');
    this.mService.menuActivo.emit('active');
    this.activo=true;
  }
 
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }
}
