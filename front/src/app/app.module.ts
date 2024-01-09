import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './e-commerce/home/home.component';
import { NavbarComponent } from './e-commerce/home/components/navbar/navbar.component';
import { WelcomeComponent } from './e-commerce/home/components/welcome/welcome.component';
import { HomeModule } from './e-commerce/home/home.module';
import { FooterComponent } from './e-commerce/home/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    WelcomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
