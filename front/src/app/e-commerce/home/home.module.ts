import { CommonModule } from "@angular/common";
import { HomeRoutes } from "./home.routes";
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { ProductosComponent } from './modules/productos/productos.component';
import { ServiciosComponent } from './modules/servicios/servicios.component';
import { DestacadosComponent } from './components/destacados/destacados.component';
import { ProductoComponent } from './components/producto/producto.component';
import { DetalleProductoComponent } from './modules/detalle-producto/detalle-producto.component';
import { ModalService } from "./services/modal/modal.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VentaProductoComponent } from './modules/venta-productos/venta-producto.component';
import { ProductoVentaComponent } from './components/producto-venta/producto-venta.component';
import { PedidosComponent } from './modules/pedidos/pedidos.component';
import { DetallePedidoComponent } from './modules/detalle-pedido/detalle-pedido.component';
import { HttpClientModule } from "@angular/common/http";
import { LoginRegisterComponent } from './modules/login-register/login-register.component';
import { ModificacionUsuarioComponent } from './modules/modificacion-usuario/modificacion-usuario.component';
import { SeguimientoPedidoComponent } from './modules/seguimiento-pedido/seguimiento-pedido.component';
import { CarrouselProductosComponent } from './components/carrousel-productos/carrousel-productos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductosComponent,
    ServiciosComponent,
    DestacadosComponent,
    ProductoComponent,
    DetalleProductoComponent,
    VentaProductoComponent,
    ProductoVentaComponent,
    PedidosComponent,
    DetallePedidoComponent,
    LoginRegisterComponent,
    ModificacionUsuarioComponent,
    SeguimientoPedidoComponent,
    CarrouselProductosComponent
  ],
  providers: [
    ModalService,
    BsModalService
  ]
})

export class HomeModule { }