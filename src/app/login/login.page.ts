import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  async handleLogin() {
    try {
      const response = await this.authService.login(this.email, this.password);
      console.log('ID del arrendatario almacenado:', localStorage.getItem('arrendatarioId'));
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/places']);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Credenciales incorrectas');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}