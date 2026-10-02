import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, Header, Footer],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

}
