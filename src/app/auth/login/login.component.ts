import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 

  miFormulario:FormGroup=this.fb.group({
    correo:['advinjosuev899@gmail.com',[Validators.required,Validators.email]],
    contrasena:['123456',[Validators.required,Validators.minLength(6)]]
  })

  constructor(
    public fb:FormBuilder,
    private router:Router,
    private authService:AuthService
    ){}

  
  login(){
    const {correo, contrasena} = this.miFormulario.value;

    this.authService.login(correo,contrasena)
    .subscribe(ok=>{
     
      if(ok===true){
        Swal.fire('Bienvenido','Usuario logeado correctamente','success');
        this.router.navigateByUrl('inicio/dashboard');
      }else{
        Swal.fire('Error','Usuario incorrecto!','error');
        this.router.navigateByUrl('auth/login');
      }
    })
  }

}
