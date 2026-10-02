import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { TermsOfService } from './pages/terms-of-service/terms-of-service';
import { RefundPolicy } from './pages/refund-policy/refund-policy';
import { ShippingPolicy } from './pages/shipping-policy/shipping-policy';
import { Faq } from './pages/faq/faq';
import { Products } from './pages/products/products';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetail },
  { path: 'profile', component: Profile },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-of-service', component: TermsOfService },
  { path: 'faq', component: Faq },
  { path: 'refund-policy', component: RefundPolicy },
  { path: 'shipping-policy', component: ShippingPolicy }
];
