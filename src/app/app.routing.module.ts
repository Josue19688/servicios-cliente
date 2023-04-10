import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes:Routes=[
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'inicio',
    loadChildren:()=>import('./pages/page.module').then(m=>m.PageModule)
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
]


@NgModule({
    imports: [
      RouterModule.forRoot( routes ),
    ],
    exports: [ RouterModule ]
  })
export class AppRoutingModule { }