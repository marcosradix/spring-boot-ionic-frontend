import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileModalPicturePage } from './profile-modal-picture';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    ProfileModalPicturePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileModalPicturePage),
  ],
  providers: [
    Camera
  ]
})
export class ProfileModalPicturePageModule {}
