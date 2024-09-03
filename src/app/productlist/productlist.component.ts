import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../types/types';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [],
  template: `
<div class="container">
    @let productList = (productResult$ | async);
    <!-- heroesResult$ es un observable, lo que significa que no contiene los datos directamente, sino que emite valores de datos de forma asincrónica con el tiempo.
El operador async se utiliza para subscribirse automáticamente al observable y obtener su valor más reciente. Este valor es lo que se asigna a heroesList.
Al hacer esto al principio de la plantilla, te aseguras de que el resultado del observable se resuelve y se almacena en heroesList, lo que facilita el trabajo con los datos resueltos a lo largo de la plantilla. -->

    @if(!productList?.length){
    <p>loading...</p>
    }@else {
    <table class="table table-secondary table-striped">
        <caption>
            Listado de productos
        </caption>
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>

            </tr>
        </thead>
        <tbody>

            @for(hero of productList; track hero.id; let i = $index){
            <tr (click)="onProductClicked(hero.id)">
                <td scope="row">{{ i + 1 }}</td>
                <td>{{ hero.name }}</td>

            </tr>
            }

        </tbody>
        <tfoot>
            <tr>
                <td colspan="2">Heroes count: {{ (productResult$ | async)?.length }}</td>
            </tr>
        </tfoot>
    </table>
    }
</div>
  `,
  styleUrl: './productlist.component.css'
})
export class ProductListComponent implements OnInit {
  public productResult$!: Observable<IProduct[]>;
productList: any;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.productResult$ = this.api.getAllProducts();
  }

  onProductClicked(productId: string): void {
    this.router.navigate(['/product-list', productId]);
  }
}
