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
      tap(token => {
        localStorage.setItem(this.tokenKey, token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
