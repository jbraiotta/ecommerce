import { Component, Input } from '@angular/core';
import { IProduct } from '../types/types';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [],
  template: `
    <div>
      Detalle del producto! {{this.productResult$}}
    </div>
  `,
  styleUrl: './productdetail.component.css'
})
export class ProductDetailComponent {
  public productResult$!: Observable<IProduct>;
  @Input('id') productId!: string; //si la variable heroId se llamara id, no necesito indicarle el nombre del param al decorador Input
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    alert(this.productId)
    this.productResult$ = this.api.getProduct(this.productId);
  }
}
