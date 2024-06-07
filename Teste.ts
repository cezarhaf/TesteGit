// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://apiweb.com/autenticar';

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { usuario, senha }).pipe(
      tap(response => {
        if (response.token) {
          // Armazene o token ou faça outras ações de sucesso aqui
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/home']);  // Redireciona para a home em caso de sucesso
        }
      })
    );
  }
}
_




#





#

// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.usuario, this.senha).subscribe(
      () => {
        // Sucesso: Redirecionamento já está no serviço AuthService
      },
      error => {
        // Trate o erro aqui
        this.errorMessage = 'Login falhou. Verifique suas credenciais.';
      }
    );
  }
}




#





#

<!-- login.component.html -->
<div>
  <h2>Login</h2>
  <form (ngSubmit)="login()">
    <div>
      <label for="usuario">Usuário:</label>
      <input type="text" id="usuario" [(ngModel)]="usuario" name="usuario" required>
    </div>
    <div>
      <label for="senha">Senha:</label>
      <input type="password" id="senha" [(ngModel)]="senha" name="senha" required>
    </div>
    <button type="submit">Login</button>
  </form>
  <div *ngIf="errorMessage">{{ errorMessage }}</div>
</div>














