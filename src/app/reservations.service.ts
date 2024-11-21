import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservationsSubject = new BehaviorSubject<any[]>([]);
  reservations$ = this.reservationsSubject.asObservable();

  private placeSubject = new BehaviorSubject<any>(null);
  place$ = this.placeSubject.asObservable();

  async loadReservations(placeId: number) {
    try {
      const response = await axios.get(`https://toncipinto.nur.edu/api/reservas/lugar/${placeId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Respuesta de API en Servicio:', response.data); 

      if (response.data && response.data.reservas) {
        this.reservationsSubject.next(response.data.reservas);
        this.placeSubject.next(response.data);
      } else {
        console.error('La respuesta de la API no contiene reservas:', response.data);
        this.reservationsSubject.next([]);
        this.placeSubject.next(null);
      }
    } catch (error) {
      console.error('Error al cargar las reservas en el servicio:', error);
      this.reservationsSubject.next([]);
      this.placeSubject.next(null);
    }
  }
}