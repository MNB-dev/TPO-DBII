import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MaterialModule,
    AppRoutingModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  menuItems = [
    { name: 'Amenities', icon: 'build', link: '/amenities' },
    { name: 'Habitación', icon: 'hotel', link: '/habitacion' },
    { name: 'Hotel', icon: 'business', link: '/hotel' },
    { name: 'Huésped', icon: 'person', link: '/huesped' },
    { name: 'POI', icon: 'place', link: '/poi' }, 
    { name: 'Reserva', icon: 'assignment', link: '/reserva' }
  ];

}
