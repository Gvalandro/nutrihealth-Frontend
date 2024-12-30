// landing.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router'; // Importamos o Router do @angular/router

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  standalone: true,
  styleUrls: ['./landing.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
})
export class LandingComponent {
  formType: 'login' | 'register' | null = null;
  landForm!: FormGroup;
  submitted = false;

  // Note que agora estamos usando o Router do Angular
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigateByUrl(path); // O método navigate do Angular Router funciona com arrays
  }
}
