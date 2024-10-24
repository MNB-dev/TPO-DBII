import { RouterModule, Routes } from '@angular/router';
import { AmenitiesComponent } from './pages/amenities/amenities.component';
import { HabitacionComponent } from './pages/habitacion/habitacion.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { HuespedComponent } from './pages/huesped/huesped.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { POIComponent } from './pages/poi/poi.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'amenities', component: AmenitiesComponent },
    { path: 'habitacion', component: HabitacionComponent },
    { path: 'hotel', component: HotelComponent },
    { path: 'huesped', component: HuespedComponent },
    { path: 'poi', component: POIComponent },
    { path: 'reserva', component: ReservaComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }