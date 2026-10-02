import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-faq',
  imports: [Header, Footer],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {

}
