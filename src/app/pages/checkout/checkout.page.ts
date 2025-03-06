import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone:false
})
export class CheckoutPage {
  cart: any[] = [];
  total: number = 0;
  checkoutData = {
    nombre: '',
    email: '',
    direccion: '',
    tarjeta: '',
    expiracion: '',
    cvv: ''
  };

  formErrors: any = {};

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ionViewWillEnter() {
    this.cart = this.cartService.getCart();
    this.total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  validarFormulario(): boolean {
    this.formErrors = {}; // Reinicia los errores

    if (!this.checkoutData.nombre?.trim()) {
        this.formErrors.nombre = 'El nombre es obligatorio';
    }
    if (!this.checkoutData.email?.includes('@')) {
        this.formErrors.email = 'Ingrese un email válido';
    }
    if (!this.checkoutData.direccion?.trim()) {
        this.formErrors.direccion = 'La dirección es obligatoria';
    }
    if (!/^\d{16}$/.test(this.checkoutData.tarjeta)) {
        this.formErrors.tarjeta = 'La tarjeta debe tener 16 dígitos numéricos';
    }
    if (!/^\d{3}$/.test(this.checkoutData.cvv)) {
        this.formErrors.cvv = 'El CVV debe tener 3 dígitos';
    }
    if (!this.esFechaValida(this.checkoutData.expiracion)) {
        this.formErrors.expiracion = 'Fecha de expiración no válida';
    }

    return Object.keys(this.formErrors).length === 0; // Retorna true si no hay errores
  }

  esFechaValida(expiracion: string): boolean {
    if (!expiracion) return false;
    const [year, month] = expiracion.split('-').map(Number);
    if (!year || !month) return false;
    const fechaExp = new Date(year, month, 0);
    const fechaActual = new Date();
    return fechaExp > fechaActual;
  }

  async procesarPago() {
    if (!this.validarFormulario()) {
        return;
    }

    const checkoutDataFormatted = {
      customer: {
          name: this.checkoutData.nombre,
          email: this.checkoutData.email,
          address: this.checkoutData.direccion
      },
      cart: this.cart,
      total: this.total
  };

  localStorage.setItem('checkoutData', JSON.stringify(checkoutDataFormatted));

  // Redirigir a la página de resumen
  this.router.navigate(['/summary']);

    const loading = await this.loadingController.create({
      message: 'Procesando pago...',
      duration: 3000
    });
    await loading.present();

    // Guardar datos en LocalStorage
    localStorage.setItem('checkoutData', JSON.stringify({
      customer: this.checkoutData,
      cart: this.cart,
      total: this.total
    }));

    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['/summary']);
      this.cartService.clearCart();
    }, 3000);
  }
}