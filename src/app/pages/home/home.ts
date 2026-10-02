import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import productsData from '../../../assets/data/products.json';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  logoPath = 'assets/images/logo.PNG';

  private productsSubject = new BehaviorSubject<Product[]>(productsData);

  products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Get the calculated price for a product
  getProductPrice(product: Product): string {
    const discount = product.discount || 0;
    const discountedPrice = product.originalPrice * (1 - discount / 100);
    return `₹${discountedPrice.toLocaleString('en-IN')}`;
  }

  // Format the original price for display
  formatOriginalPrice(originalPrice: number): string {
    return `₹${originalPrice.toLocaleString('en-IN')}`;
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  viewAllProducts(): void {
    this.router.navigate(['/products']);
  }
}
