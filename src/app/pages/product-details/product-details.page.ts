import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone:false
})
export class ProductDetailsPage implements OnInit {
  product: any;
  cartItemCount: number = 0;

  constructor(private route: ActivatedRoute, 
    private productService: ProductService, 
    private cartService: CartService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(parseInt(productId)).subscribe((data) => {
        this.product = data;
      });
    }

    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.presentToast('Producto agregado al carrito');
  }
  
  // Método para mostrar un mensaje de confirmación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
  

}
