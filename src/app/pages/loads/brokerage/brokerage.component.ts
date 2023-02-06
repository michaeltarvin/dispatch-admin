import { Component } from '@angular/core';
import { LoadsService } from '../loads.service';

@Component({
  selector: 'fury-brokerage',
  templateUrl: './brokerage.component.html',
  styleUrls: ['./brokerage.component.scss']
})
export class BrokerageComponent {

  constructor(private loadsService: LoadsService) { }

  searchByTrip($event: number) {
    this.loadsService.tripChanged($event);
  }

  onDateChange($event: string) {
    this.loadsService.dateChanged($event);
  }

}
