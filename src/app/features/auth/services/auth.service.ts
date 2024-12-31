// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Interface ajustada conforme a resposta do backend
interface AuthResponse {
  token: string;  // Pois o backend retorna apenas o JWT
}

interface UserLoginDTO {  // Renomeado para manter consistência com o backend
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/auth'; // Ajuste para sua porta do Spring
  private tokenKey = 'auth_token';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(userLoginDTO: UserLoginDTO): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/register`, userLoginDTO).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      })
    );
  }

  login(userLoginDTO: UserLoginDTO): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/login`, userLoginDTO).pipe(
      tap((token) => {
        try {
          localStorage.setItem(this.tokenKey, token);
          this.isAuthenticatedSubject.next(true);
        } catch (error) {
          console.error('Erro ao acessar o localStorage:', error);
        }
      })
    );
  }

  logout(): void {
    try {
      localStorage.removeItem(this.tokenKey);
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao remover item do localStorage:', error);
    }
  }


  getToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    return !!this.getToken();
  }


  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
