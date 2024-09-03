import { Routes } from '@angular/router';
import { ProductListComponent } from './productlist/productlist.component';
import { ProductDetailComponent } from './productdetail/productdetail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'product-list', title: 'Productos', component: ProductListComponent },
  { path: 'product-detail/:id', title: 'Detalle', component: ProductDetailComponent },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

