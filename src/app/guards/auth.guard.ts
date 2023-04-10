import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return  this.authService.validarToken()
      .pipe(
        tap((autenticado:any)=>{
          if(!autenticado){
            this.router.navigateByUrl('auth/login');
          }
        })
      )
  }
  
}
