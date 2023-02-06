import { Component } from '@angular/core';
import { LoadsService } from './loads.service';

@Component({
  selector: 'fury-drivers',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss']
})
export class LoadsComponent {

  constructor(private loadsService: LoadsService) { }

  searchByTrip($event: number) {
    this.loadsService.tripChanged($event);
  }

  onDateChange($event: string) {
    this.loadsService.dateChanged($event);
  }

}
