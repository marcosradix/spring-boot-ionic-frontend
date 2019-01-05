import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickaddressPage } from './pickaddress';

@NgModule({
  declarations: [
    PickaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(PickaddressPage),
  ],
})
export class PickaddressPageModule {}
