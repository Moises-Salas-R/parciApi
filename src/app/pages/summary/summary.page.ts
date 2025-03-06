import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Customer {
  name: string;
  email: string;
  address: string;
  cardNumber: string;
  expiration: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
  standalone:false
})
export class SummaryPage {
  customer: Customer = { name: '', email: '', address: '', cardNumber: '', expiration: '' };
  cart: CartItem[] = [];
  total: number = 0;
  checkoutData: any = {};

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.customer = navigation.extras.state['customer'] as Customer;
      this.cart = navigation.extras.state['cart'] as CartItem[];
      this.total = navigation.extras.state['total'] as number;
    }
  }

  ngOnInit() {
    const storedData = localStorage.getItem('checkoutData');
    if (storedData) {
        const parsedData = JSON.parse(storedData);

        console.log('Datos recuperados en Summary:', parsedData); // Verifica en consola

        this.customer = parsedData.customer || { name: '', email: '', address: '' };
        this.cart = parsedData.cart || [];
        this.total = parsedData.total || 0;
    }
}

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  finalizarCompra() {
    localStorage.removeItem('checkoutData'); // 🗑️ Limpiamos el LocalStorage
    alert('Compra finalizada con éxito 🎉');
    this.router.navigate(['/home']);
  }

}