import {
  Injectable,
  Component,
  ElementRef,
  ViewContainerRef,
  NgModule,
  ModuleWithProviders,
  EmbeddedViewRef,
  ComponentFactoryResolver,
  ChangeDetectionStrategy,
  ViewChild,
  ComponentRef
} from '@angular/core';

import { ProgressCirclePanelComponent } from './progress-circle-panel.component';

@Injectable({ providedIn: 'root' })
export class SpinnerService {

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  showSpin(spinContainer: ViewContainerRef, fnSelector?: (spinContainer: any) => any) {
    let target = $(spinContainer.element.nativeElement);
    if (fnSelector) {
      target = fnSelector(target);
      console.log(target);
    }

    if (target.length > 0) {
      Promise.resolve(null).then(() => {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(ProgressCirclePanelComponent);
        let componentRef = spinContainer.createComponent(componentFactory, spinContainer.length, spinContainer.parentInjector);
        let hostView = <EmbeddedViewRef<any>>componentRef.hostView;
        target.append(hostView.rootNodes[0]);
        target.data('pcpInstance', componentRef.instance);
        spinContainer = null;
        componentRef = null;
        target = null;
      });
    }
  }

  stopSpin(spinContainer: ViewContainerRef, fnSelector?: (spinContainer: any) => any): any {
    let target = $(spinContainer.element.nativeElement);
    if (fnSelector) {
      target = fnSelector(target);
    }

    if (target.length > 0) {
      Promise.resolve(null).then(() => {
        let pcpInstance = target.data('pcpInstance') as ProgressCirclePanelComponent;
        if (pcpInstance) {
          pcpInstance.ngOnDestroy();
        }
        target.removeData('pcpInstance');

        target.find('ms-progress-circle-panel').remove();
        target = null;
      });
    }
  }

}
