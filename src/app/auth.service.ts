import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  async login(email: string, password: string) {
    try {
      const response = await axios.post('https://toncipinto.nur.edu/api/arrendatario/login', { email, password });
      console.log('Respuesta de la API de inicio de sesión:', response.data);
      const arrendatarioId = response.data.id;
      localStorage.setItem('arrendatarioId', arrendatarioId.toString());
      return response.data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
}