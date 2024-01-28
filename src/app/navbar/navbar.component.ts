import { Component } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkWithHref], //RouterLinkWithHref (sert a utiliser le router dans les balise <a> )pour pouvoir utiliser routerLink dans le template.
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router) {} // Injection du service Router ici.

  navigateHome() {
    this.router.navigate(['/']); // Exemple de méthode pour naviguer programmatically.
  }
}
