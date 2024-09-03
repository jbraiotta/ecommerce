import { Component } from '@angular/core';
import { ProductListComponent } from "../productlist/productlist.component";

@Component({
  selector: 'app-producthome',
  standalone: true,
  imports: [ProductListComponent],
  template: `
      <app-productlist></app-productlist>
  `,
  styleUrl: './producthome.component.css'
})
export class ProductHomeComponent {

}
