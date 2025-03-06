import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'shopping_cart';
  private cart: any[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCart();
  }

  

  // Obtener productos del carrito
  getCart(): any[] {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  // Método corregido: Agregar producto al carrito
  addToCart(product: any): void {
    let cart = this.getCart();
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    this.saveCart();
    this.updateCartItemCount(); 
  }

  private updateCartItemCount(): void {
    const cart = this.getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    this.cartItemCount.next(totalItems);
  }
  

  // Método para eliminar un producto del carrito
  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  // Método para limpiar el carrito
  clearCart(): void {
    this.cart = [];
    localStorage.removeItem(this.cartKey);
    this.cartItemCount.next(0);
  }

  // Guardar carrito en localStorage
  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
    this.cartItemCount.next(this.cart.length);
  }

  // Cargar carrito desde localStorage
  private loadCart(): void {
    const cart = localStorage.getItem(this.cartKey);
    this.cart = cart ? JSON.parse(cart) : [];
    this.cartItemCount.next(this.cart.length);
  }

  updateQuantity(productId: number, quantity: number): void {
    let cart = this.getCart();
    const productIndex = cart.findIndex(item => item.id === productId);
  
    if (productIndex !== -1) {
      cart[productIndex].quantity = quantity;
      this.saveCart();
      this.updateCartItemCount();
    }
  }
  

}
