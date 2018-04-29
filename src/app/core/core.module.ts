import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
