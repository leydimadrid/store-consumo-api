import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() {}

  //Obtener datos
  getProduct(category?: string) {
    const url = new URL('https://fakestoreapi.com/products');
    if (category) {
      url.searchParams.set('category', category);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOne(id: string) {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }
}
