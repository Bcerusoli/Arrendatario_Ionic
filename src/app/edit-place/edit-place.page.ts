import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.page.html',
  styleUrls: ['./edit-place.page.scss'],
})
export class EditPlacePage implements OnInit {
  placeId: number | null = null;
  nombre: string = '';
  descripcion: string = '';
  cantPersonas: number = 0;
  cantCamas: number = 0;
  cantBanios: number = 0;
  cantHabitaciones: number = 0;
  tieneWifi: boolean = false;
  cantVehiculosParqueo: number = 0;
  precioNoche: string = '';
  costoLimpieza: string = '';
  ciudad: string = '';
  latitud: string = '';
  longitud: string = '';
  fotos: File[] = [];
  arrendatarioId: number | null = null; 

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.placeId = +id;
      this.loadPlaceData();
    }
    // Obtén el ID del arrendatario desde el almacenamiento local
    const storedArrendatarioId = localStorage.getItem('arrendatarioId');
    if (storedArrendatarioId) {
      this.arrendatarioId = parseInt(storedArrendatarioId, 10);
    }
  }

  async loadPlaceData() {
    if (this.placeId !== null) {
      try {
        const response = await axios.get(`https://toncipinto.nur.edu/api/lugares/${this.placeId}`);
        const place = response.data;
        this.nombre = place.nombre;
        this.descripcion = place.descripcion;
        this.cantPersonas = place.cantPersonas;
        this.cantCamas = place.cantCamas;
        this.cantBanios = place.cantBanios;
        this.cantHabitaciones = place.cantHabitaciones;
        this.tieneWifi = place.tieneWifi === 1; 
        this.cantVehiculosParqueo = place.cantVehiculosParqueo;
        this.precioNoche = place.precioNoche;
        this.costoLimpieza = place.costoLimpieza;
        this.ciudad = place.ciudad;
        this.latitud = place.latitud;
        this.longitud = place.longitud;
      } catch (error) {
        console.error('Error al cargar los datos del lugar:', error);
      }
    }
  }

  async handleEditPlace() {
    try {
      if (this.arrendatarioId === null) {
        throw new Error('No se encontró el ID del arrendatario en el almacenamiento local');
      }

      const placeData = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        cantPersonas: this.cantPersonas,
        cantCamas: this.cantCamas,
        cantBanios: this.cantBanios,
        cantHabitaciones: this.cantHabitaciones,
        tieneWifi: this.tieneWifi ? 1 : 0, 
        cantVehiculosParqueo: this.cantVehiculosParqueo,
        precioNoche: this.precioNoche,
        costoLimpieza: this.costoLimpieza,
        ciudad: this.ciudad,
        latitud: this.latitud,
        longitud: this.longitud,
        arrendatario_id: this.arrendatarioId 
      };

      if (this.placeId !== null) {
        await axios.put(`https://toncipinto.nur.edu/api/lugares/${this.placeId}`, placeData);
        // Subir fotos
        for (const foto of this.fotos) {
          const formData = new FormData();
          formData.append('foto', foto);
          await axios.post(`https://toncipinto.nur.edu/api/lugares/${this.placeId}/foto`, formData);
        }
        alert('Lugar actualizado exitosamente');
        this.router.navigate(['/places']);
      }
    } catch (error) {
      console.error('Error al actualizar el lugar:', error);
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const validationErrors = error.response.data;
        alert('Errores de validación: ' + JSON.stringify(validationErrors));
      } else {
        alert('Error al actualizar el lugar');
      }
    }
  }

  handleFileInput(event: any) {
    this.fotos = Array.from(event.target.files);
  }

  navigateToReservations() {
    if (this.placeId !== null) {
      this.router.navigate(['/reservations', this.placeId]);
    }
  }
}