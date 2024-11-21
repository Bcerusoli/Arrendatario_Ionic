
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {
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

  constructor(private router: Router) { }

  ngOnInit() { }

  async handleAddPlace() {
    try {
      // Obtener el ID del arrendatario desde el almacenamiento local
      const arrendatarioId = localStorage.getItem('arrendatarioId');
      if (!arrendatarioId) {
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
        arrendatario_id: arrendatarioId 
      };

      console.log('Datos del lugar:', placeData);

      // Guardar el nuevo lugar
      const response = await axios.post('https://toncipinto.nur.edu/api/lugares', placeData);
      const placeId = response.data.id;

      console.log('ID del lugar creado:', placeId);

      // Subir fotos
      for (const foto of this.fotos) {
        const formData = new FormData();
        formData.append('foto', foto);
        const uploadUrl = `https://toncipinto.nur.edu/api/lugares/${placeId}/foto`;
        console.log('Subiendo foto a:', uploadUrl);
        await axios.post(uploadUrl, formData);
      }

      alert('Lugar agregado exitosamente');
      this.router.navigate(['/places'], { replaceUrl: true });
    } catch (error) {
      console.error('Error al agregar el lugar:', error);
      alert('Error al agregar el lugar');
    }
  }

  handleFileInput(event: any) {
    this.fotos = Array.from(event.target.files);
  }
}