// landing.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importamos o Router do @angular/router
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  standalone: true,
  styleUrls: ['./landing.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule
  ],
})
export class LandingComponent {
  // Note que agora estamos usando o Router do Angular
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigateByUrl(path); // O método navigate do Angular Router funciona com arrays
  }
}
