import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone:false
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private cartService: CartService) {}

  getStars() {
    return new Array(Math.round(this.product.rating.rate));
  }

  addToCart(event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(this.product);
  }

  viewDetails() {
    // Navegación a la página de detalles (se implementará más adelante)
  }
}
