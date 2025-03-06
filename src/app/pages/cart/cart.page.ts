import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone:false
})
export class CartPage implements OnInit {
  cart: any[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  // Cargar carrito
  loadCart() {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }

  // Calcular total
  calculateTotal() {
    this.total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Eliminar producto
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
    this.showToast('Producto eliminado del carrito');
  }

  // Mostrar notificación tipo Toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

  increaseQuantity(product: any) {
    this.cartService.updateQuantity(product.id, product.quantity + 1);
  }
  
  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      this.cartService.updateQuantity(product.id, product.quantity - 1);
    } else {
      this.cartService.removeFromCart(product.id);
    }
  }
  
  checkout() {
    const cart = this.cartService.getCart();
    if (cart.length === 0) {
      this.showToast('Debe agregar al menos un producto para proceder con el pago.');
      return;
    }
    this.router.navigate(['/checkout']);
  }

}
