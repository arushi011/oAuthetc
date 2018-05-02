import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { FriendsComponent } from './feature/friends/friends.component';
import { EventsComponent } from './feature/events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { DataManagementService } from './feature/shared/data-management.service';



@NgModule({
  declarations: [
    AppComponent,
    FriendsComponent,
    EventsComponent,
  ],
  imports: [
    HttpClientModule,
    AuthModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DataManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
