import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  cartItemCount: number = 0;

  constructor(private cartService: CartService,
    private router: Router,
    private productService: ProductService, 
    private navCtrl: NavController) { }

  ngOnInit() {
    
    this.loadProducts();
    this.loadCategories();
    
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }


  // Cargar todos los productos
  loadProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.originalProducts = [...this.products];
    });
  }

  // Cargar todas las categorías
  loadCategories() {
    this.productService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Filtrar productos por categoría
  filterByCategory(category: string) {
    if (category === '') {
      this.loadProducts();
    } else {
      this.productService.getProductsByCategory(category).subscribe((data) => {
        this.products = data;
      });
    }
  }

  // Método para navegar a la página de detalles
  goToDetails(productId: number) {
  this.navCtrl.navigateForward(`/product-details/${productId}`);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  selectedSort: string = 'relevance';
  originalProducts: any[] = [];

  sortProducts(order: string) {
  if (order === 'relevance') {
    this.filterByCategory(this.selectedCategory);
    this.products = [...this.originalProducts]; // Restaurar el orden original
  } else if (order === 'name-asc') {
    this.products.sort((a, b) => a.title.localeCompare(b.title));
  } else if (order === 'name-desc') {
    this.products.sort((a, b) => b.title.localeCompare(a.title));
  } else if (order === 'price-high') {
    this.products.sort((a, b) => b.price - a.price);
  } else if (order === 'price-low') {
    this.products.sort((a, b) => a.price - b.price);
  }
}


}
