import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,    Route,    Router,  RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}




@Injectable({
  providedIn: 'root'
})
export class IsadminGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router
  ){}
  
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let url: string = state.url;
      return this.checkUserLogin(route, url);
    
  }

  
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      const allowedRoles = route.data?.['allowedRoles'];
      const autorizado = allowedRoles.includes(userRole);//true o false
      
      if (!autorizado ) {
        this.router.navigate(['inicio/dashboard']);
        Swal.fire('Acceso Denegado!','Contáctese con el Administrador.','error');
        return false;
      }
    }
    
    return true;
  }


}
