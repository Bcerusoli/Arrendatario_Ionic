import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  nombrecompleto: string = '';
  password: string = '';
  telefono: string = '';

  constructor() { }

  ngOnInit() { }

  async handleRegister() {
    try {
      const response = await axios.post('https://toncipinto.nur.edu/api/arrendatario/registro', {
        nombrecompleto: this.nombrecompleto,
        email: this.email,
        password: this.password,
        telefono: this.telefono
      });
      alert('Registro exitoso');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro');
    }
  }
}