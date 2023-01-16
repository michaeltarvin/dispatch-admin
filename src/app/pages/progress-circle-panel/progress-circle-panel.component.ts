import { Component, ViewChild } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'ms-progress-circle-panel',
  template: `<div id="panel" #panel>
               <div id="progress">
                    <mat-spinner></mat-spinner>
                </div>
               <div id="spin-background"></div>
               </div>
`,
  styles: [`
          #spin-background {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 2001;
                opacity: 0.6;
         }
         #progress {
             position: absolute;
             left: 50%;
             top: 50%;
             transform: translate(-50%, -50%);
             z-index: 9001;
         }`]
})
export class ProgressCirclePanelComponent {
  @ViewChild(MatProgressSpinner) matProgressSpinner: any;

  constructor() { }

  ngOnDestroy() { }

}
