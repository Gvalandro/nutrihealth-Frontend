// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importamos o RouterOutlet

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true, // Marcamos como standalone
  imports: [RouterOutlet] // Importamos explicitamente o RouterOutlet
})
export class AppComponent {
  title = 'healthNutritionFront';
}
