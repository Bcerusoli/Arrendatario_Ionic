
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
  places: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadPlaces();
  }

  ionViewWillEnter() {
    this.loadPlaces();
  }

  async loadPlaces() {
    try {
      const arrendatarioId = localStorage.getItem('arrendatarioId');
      if (!arrendatarioId) {
        throw new Error('No se encontró el ID del arrendatario en el almacenamiento local');
      }

      const response = await axios.get(`https://toncipinto.nur.edu/api/lugares/arrendatario/${arrendatarioId}`);
      this.places = response.data;
      console.log('Lugares cargados:', this.places);
    } catch (error) {
      console.error('Error al cargar los lugares:', error);
      alert('Error al cargar los lugares');
    }
  }

  
  navigateToAddPlace() {
    this.router.navigate(['/add-place']);
  }

  navigateToEditPlace(placeId: number) {
    this.router.navigate(['/edit-place', placeId]);
  }
}