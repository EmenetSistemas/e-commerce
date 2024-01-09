import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductosComponent } from './modules/productos/productos.component';

export const HomeRoutes : Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'productos',
                component: ProductosComponent
            }
        ]
    }
];