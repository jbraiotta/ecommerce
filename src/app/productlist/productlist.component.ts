import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../types/types';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common'
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [AsyncPipe, CarouselModule],
  template: `

  <div class="container">
  <p> Listado de productos</p>
  @let productList = (productResult$ | async);
    @if(!productList?.length){
    <p>loading...</p>
    }@else {
      <p-carousel
    [value]="productList!"
    [numVisible]="3"
    [numScroll]="3"
    [circular]="false"
    [responsiveOptions]="responsiveOptions">
        <ng-template let-product pTemplate="item">
            <div class="border-1 surface-border border-round m-2 p-3">
                <div class="mb-3">
                    <div class="relative mx-auto">
                        <img (click)="onProductClicked(product.id)"
                            src="/assets/{{ product.avatar }}"
                            [alt]="product.name"
                            class="w-full border-round"
                            width="200px" />
                        <p-tag
                            class="absolute"
                            [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                    </div>
                </div>
                <div class="mb-3 font-medium">
                    {{ product.name }}
                </div>
                <div class="flex justify-content-between align-items-center">
                <div class="mt-0 font-semibold text-xl">
                    {{ '$' + product.price }}
                </div>
                    <span>
                        <!-- <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                        <p-button icon="pi pi-shopping-cart" styleClass="ml-2" /> -->
                    </span>
                </div>
            </div>
        </ng-template>
</p-carousel>
}
  `,
  styleUrl: './productlist.component.css'
})
export class ProductListComponent implements OnInit {
  public productResult$!: Observable<IProduct[]>;
  @Input('productSelected') productSelected : boolean = false;
productList: any;
responsiveOptions: CarouselResponsiveOptions[]|undefined;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.productResult$ = this.api.getAllProducts();
  }

  onProductClicked(productId: string): void {
    console.log(productId)
    this.productSelected = true;
    this.router.navigate(['/product-detail', productId]);
  }
}
