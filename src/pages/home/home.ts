import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Slides } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public menu:MenuController) {

  }

  ionViewWillEnter(){
   this.menu.swipeEnable(false);
  }

  ionViewCanLeave(){
   this.menu.swipeEnable(true);
  }

    login() {
      this.navCtrl.setRoot("CategoriasPage");
  }


}
