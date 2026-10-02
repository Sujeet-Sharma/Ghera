import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Product } from '../../models/product.model';
import productsData from '../../../assets/data/products.json';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit, OnDestroy {
  product: Product | null = null;
  currentImageIndex = 0;
  currentImage = '';
  selectedSize = '';
  selectedColor = '';
  phoneNumber = '8505860989';
  quantity = 1;
  isLiked = false;
  autoSlideInterval: any;
  showSizeModal = false;
  pendingContact: 'whatsapp' | 'instagram' | '' = '';
  promocode = '';
  promocodeError = '';

  // Sample product data - in real app, this would come from a service
  private products: Product[] = productsData;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === productId) || null;

    if (this.product) {
      this.currentImage = this.product.images[0];
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
    this.currentImage = this.product!.images[index];
    this.stopAutoSlide();
    this.startAutoSlide(); // Restart auto-slide
  }

  previousImage(): void {
    if (this.product) {
      this.currentImageIndex = this.currentImageIndex > 0 ? this.currentImageIndex - 1 : this.product.images.length - 1;
      this.currentImage = this.product.images[this.currentImageIndex];
    }
  }

  nextImage(): void {
    if (this.product) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
      this.currentImage = this.product.images[this.currentImageIndex];
    }
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  selectColor(color: { name: string; hex: string }): void {
    this.selectedColor = color.name;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  validatePromocode(): void {
    this.promocodeError = '';
    const code = this.promocode.trim();

    if (code.length === 0) return;

    if (code.length !== 10) {
      this.promocodeError = 'Promocode must be exactly 10 characters long.';
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(code)) {
      this.promocodeError = 'Promocode can only contain letters and numbers.';
      return;
    }

    const hasLetter = /[a-zA-Z]/.test(code);
    const hasDigit = /\d/.test(code);

    if (!hasLetter || !hasDigit) {
      this.promocodeError = 'Promocode must contain both letters and numbers.';
      return;
    }

    // Valid
  }

  addToCart(): void {
    // In a real app, this would add to cart service
    alert(`Added ${this.quantity} ${this.product?.name} to cart!`);
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }

  openWhatsApp(e: any) {
    e.preventDefault();
    if (!this.selectedSize) {
      this.pendingContact = 'whatsapp';
      this.showSizeModal = true;
      return;
    }

    const message = `
Hi 👋
I am interested in this product.

Product: ${this.product?.name}
Price: ₹${this.product?.price}
Product ID: ${this.product?.id}
Selected Size :${this.selectedSize}
Selected Color :${this.selectedColor}
Quantity :${this.quantity}
${this.promocode && !this.promocodeError ? `Promocode: ${this.promocode}` : ''}
Delivery charges will be calculated based on your location.

  `.trim();

    let url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }

  openInstagram(e: any) {
    e.preventDefault();
    if (!this.selectedSize) {
      this.pendingContact = 'instagram';
      this.showSizeModal = true;
      return;
    }

    const url = 'https://instagram.com/gherabypriya';
    window.open(url, '_blank');
  }

  cancelContact() {
    this.pendingContact = '';
    this.showSizeModal = false;
  }

  confirmContact() {
    const contact = this.pendingContact;
    this.pendingContact = '';
    this.showSizeModal = false;

    if (contact === 'whatsapp') {
      this.proceedWhatsApp();
    } else if (contact === 'instagram') {
      this.proceedInstagram();
    }
  }

  private proceedWhatsApp() {
    const message = this.generateContactMessage();
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  private async proceedInstagram() {
    const message = this.generateContactMessage();
    const url = 'https://instagram.com/gherabypriya';

    try {
      await navigator.clipboard.writeText(message);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Clipboard API failed, trying fallback:', err);
      // Fallback: use execCommand
      this.fallbackCopyTextToClipboard(message);
      window.open(url, '_blank');
    }
  }

  private fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy also failed:', err);
    }
    document.body.removeChild(textArea);
  }

  private generateContactMessage(): string {
    return `
Hi 👋
I am interested in this product.

Product: ${this.product?.name}
Price: ₹${this.product?.price}
Product ID: ${this.product?.id}
Selected Size: ${this.selectedSize}
Selected Color: ${this.selectedColor}
Quantity: ${this.quantity}
    `.trim();
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
