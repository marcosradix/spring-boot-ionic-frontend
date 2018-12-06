import { CredenciaisDTO } from './../../model/credenciais.dto';
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

  credentials: CredenciaisDTO = {
    email: "",
    senha: ""
  }

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
      console.log("saida ",this.credentials)
      this.navCtrl.setRoot("CategoriasPage");
  }


}
