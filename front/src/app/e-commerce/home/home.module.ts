import { CommonModule } from "@angular/common";
import { HomeRoutes } from "./home.routes";
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProductosComponent } from './modules/productos/productos.component';
import { ServiciosComponent } from './modules/servicios/servicios.component';
import { DestacadosComponent } from './components/destacados/destacados.component';
import { ProductoComponent } from './components/producto/producto.component';
import { DetalleProductoComponent } from './modules/detalle-producto/detalle-producto.component';
import { ModalService } from "./services/modal/modal.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
    ProductosComponent,
    ServiciosComponent,
    DestacadosComponent,
    ProductoComponent,
    DetalleProductoComponent
  ],
  providers: [
    ModalService,
    BsModalService
  ]
})

export class HomeModule { }