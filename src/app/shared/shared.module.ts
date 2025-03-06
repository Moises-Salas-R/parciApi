import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { CartItemComponent } from '../components/cart-item/cart-item.component';

@NgModule({
  declarations: [ProductCardComponent, CartItemComponent], 
  imports: [CommonModule, IonicModule],
  exports: [ProductCardComponent, CartItemComponent] 
})
export class SharedModule { }
