import { Component } from '@angular/core';
import { LoadsService } from '../loads.service';

@Component({
  selector: 'fury-back-haul',
  templateUrl: './back-haul.component.html',
  styleUrls: ['./back-haul.component.scss']
})
export class BackHaulComponent {

  constructor(private loadsService: LoadsService) { }

  searchByTrip($event: number) {
    this.loadsService.tripChanged($event);
  }

  onDateChange($event: string) {
    this.loadsService.dateChanged($event);
  }

}
