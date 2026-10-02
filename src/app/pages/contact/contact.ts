import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, Header, Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

}
