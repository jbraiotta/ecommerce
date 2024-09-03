import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductHomeComponent } from "./producthome/producthome.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ProductListComponent } from './productlist/productlist.component';
import { ProductDetailComponent } from './productdetail/productdetail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductHomeComponent, ProductListComponent, ProductDetailComponent, PageNotFoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
}
