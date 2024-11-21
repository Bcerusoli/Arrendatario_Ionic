import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  placeId: number = 0;
  reservations: any[] = [];
  place: any = null;

  constructor(private route: ActivatedRoute, private reservationsService: ReservationsService) { }

  ngOnInit() {
    const placeIdParam = this.route.snapshot.paramMap.get('placeId');
    console.log('placeIdParam:', placeIdParam); 
    if (placeIdParam) {
      this.placeId = +placeIdParam;
      console.log('placeId:', this.placeId); 
      this.loadReservations();
    }

    // Suscribirse a las reservas desde el servicio
    this.reservationsService.reservations$.subscribe(reservas => {
      this.reservations = reservas;
      console.log('Reservas actualizadas desde el servicio:', this.reservations);
    });

    // Suscribirse a la información del lugar desde el servicio
    this.reservationsService.place$.subscribe(place => {
      this.place = place;
      console.log('Lugar actualizado desde el servicio:', this.place);
    });
  }

  async loadReservations() {
    await this.reservationsService.loadReservations(this.placeId);
    
  }

  calculateNights(fechaInicio: string, fechaFin: string): number {
    const startDate = new Date(fechaInicio);
    const endDate = new Date(fechaFin);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }
}