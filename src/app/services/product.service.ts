import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener un solo producto por ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener todas las categorías
  getAllCategories(): Observable<any> {
    return this.http.get<any>('https://fakestoreapi.com/products/categories');
  }

  // Obtener productos por categoría
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${category}`);
  }
}
