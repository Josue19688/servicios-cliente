import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule}  from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUsuarioComponent } from './components/modal-usuario/modal-usuario.component';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './pages/page.module';
import { DataTablesModule } from 'angular-datatables';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ComponentsModule,
    PageModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
