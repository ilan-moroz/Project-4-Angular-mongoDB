import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/header/header.component';
import { MainComponent } from './Layout/main/main.component';
import { LoginComponent } from './Comps/login/login.component';
import { AboutComponent } from './Comps/about/about.component';
import { InfoComponent } from './Comps/info/info.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MainComponent, LoginComponent, AboutComponent, InfoComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
