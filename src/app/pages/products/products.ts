import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Product } from '../../models/product.model';
import productsData from '../../../assets/data/products.json';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = productsData;

  // Filter properties
  selectedPriceRange = '';
  selectedColors: string[] = [];
  selectedSizes: string[] = [];
  selectedSort = 'newest';

  // Available filter options
  availableColors: string[] = [];

  // Modal properties
  showFilterModal = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.extractAvailableColors();
  }

  private extractAvailableColors(): void {
    const colorSet = new Set<string>();
    this.products.forEach(product => {
      if (product.colors) {
        product.colors.forEach(color => {
          colorSet.add(color.name);
        });
      }
    });
    this.availableColors = Array.from(colorSet).sort();
  }

  public getColorHex(colorName: string): string {
    for (const product of this.products) {
      if (product.colors) {
        const color = product.colors.find(c => c.name === colorName);
        if (color) {
          return color.hex;
        }
      }
    }
    return '#ccc'; // Default fallback
  }

  // Get the calculated price for a product
  getProductPrice(product: Product): string {
    const discount = product.discount || 0;
    const discountedPrice = product.originalPrice * (1 - discount / 100);
    return `₹${discountedPrice.toLocaleString('en-IN')}`;
  }

  // Get the original price for display (when there's a discount)
  getOriginalPrice(product: Product): string {
    return `₹${product.originalPrice.toLocaleString('en-IN')}`;
  }

  // Format the original price for display
  formatOriginalPrice(originalPrice: number): string {
    return `₹${originalPrice.toLocaleString('en-IN')}`;
  }

  // Getter for filtered products
  get filteredProducts(): Product[] {
    let filtered = this.products.filter(product => {
      // Price filter
      if (this.selectedPriceRange) {
        const price = this.getProductPriceValue(product);
        if (!this.isPriceInRange(price, this.selectedPriceRange)) {
          return false;
        }
      }

      // Color filter
      if (this.selectedColors.length > 0) {
        const productColors = product.colors?.map(c => c.name.toLowerCase()) || [];
        const hasMatchingColor = this.selectedColors.some(selectedColor =>
          productColors.includes(selectedColor.toLowerCase())
        );
        if (!hasMatchingColor) {
          return false;
        }
      }

      // Size filter
      if (this.selectedSizes.length > 0) {
        const productSizes = product.sizes || [];
        if (!this.selectedSizes.some(size => productSizes.includes(size))) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    return this.sortProducts(filtered);
  }

  // Helper method to sort products
  private sortProducts(products: Product[]): Product[] {
    return products.sort((a, b) => {
      switch (this.selectedSort) {
        case 'price-low':
          return this.getProductPriceValue(a) - this.getProductPriceValue(b);
        case 'price-high':
          return this.getProductPriceValue(b) - this.getProductPriceValue(a);
        case 'newest':
        default:
          return b.id - a.id; // Assuming higher ID means newer
      }
    });
  }

  // Get the numeric price value for a product
  private getProductPriceValue(product: Product): number {
    const discount = product.discount || 0;
    return product.originalPrice * (1 - discount / 100);
  }

  // Helper method to check if price is in selected range
  private isPriceInRange(price: number, range: string): boolean {
    switch (range) {
      case 'under-1000':
        return price < 1000;
      case '1000-2000':
        return price >= 1000 && price <= 2000;
      case '2000-3000':
        return price >= 2000 && price <= 3000;
      case '3000-5000':
        return price >= 3000 && price <= 5000;
      case 'above-5000':
        return price > 5000;
      default:
        return true;
    }
  }

  // Filter change handlers
  onColorToggle(color: string, checked: boolean): void {
    if (checked) {
      if (!this.selectedColors.includes(color)) {
        this.selectedColors = [...this.selectedColors, color];
      }
    } else {
      this.selectedColors = this.selectedColors.filter(c => c !== color);
    }
  }

  onSizeToggle(size: string): void {
    if (this.selectedSizes.includes(size)) {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    } else {
      this.selectedSizes = [...this.selectedSizes, size];
    }
  }

  // Clear all filters
  clearFilters(): void {
    this.selectedPriceRange = '';
    this.selectedColors = [];
    this.selectedSizes = [];
    this.selectedSort = 'newest';
  }

  // Modal methods
  openFilterModal(): void {
    this.showFilterModal = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeFilterModal(): void {
    this.showFilterModal = false;
    // Restore body scroll
    document.body.style.overflow = '';
  }

  applyFilters(): void {
    // Close modal after applying filters
    this.closeFilterModal();
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
