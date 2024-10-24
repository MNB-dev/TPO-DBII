import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HotelService } from './hotel.service';
import { Hotel } from '../../models/Hotel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.scss'
})
export class HotelComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  readonly columns: string[] = ['id', 'nombre', 'direccion', 'telefono', 'correoElectronico', 'Zona'];
  dataSource!: MatTableDataSource<Hotel>;
  hoteles: Hotel[] | undefined;

  constructor(private readonly hotelService: HotelService,) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.hotelService.getAll().subscribe(response => {
        this.hoteles = response;
        this.dataSource = new MatTableDataSource<Hotel>(this.hoteles);
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }


}
