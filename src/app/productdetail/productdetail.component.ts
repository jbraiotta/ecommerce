import { Component, inject, Input, OnInit } from '@angular/core';
import { IProduct } from '../types/types';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [AsyncPipe],
  template: `
@let product = (productResult$ | async);
@if(!product){
<p>Loading...</p>
}@else {
<div class="content card card-header text-start">
<div class="mb-2"><strong>Producto: </strong>{{product.name}}</div>
<div class="mb-2"><strong>Precio: $</strong>{{product.price}}</div>
<div class="mb-2 text-center"><img src="/assets/{{product.avatar}}" width="500px" alt="{{product.name}}" /></div>
<div class="mb-2"><strong>Stock: </strong>{{product.quantity}}</div>
<div class="mb-2"><strong>Categoria: </strong>{{product.category}}</div>
<div class="mb-2"><strong>Descripción: </strong>{{productId}}-{{product.description}}</div>
</div>
}
  `,
  styleUrl: './productdetail.component.css'
})
export class ProductDetailComponent implements OnInit {
  public productResult$!: Observable<IProduct>;
  @Input('id') productId!: string;
  private api: ApiService = inject(ApiService);

  ngOnInit(): void {
    console.log("producto",this.productId)
    this.productResult$ = this.api.getProduct(this.productId);
  }
}
