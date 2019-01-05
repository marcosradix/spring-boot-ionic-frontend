import { AuthService } from './../../service/auth.service';
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
  constructor(public navCtrl: NavController,
              public menu:MenuController,
              public authService: AuthService) {

  }

  
  autoLogin(){
    let user =  this.authService.storage.getCredentialsUser();
    if(user != null){
      this.credentials = user;
      this.login()

      if(this.authService.storage.getLocalUser()){
        this.authService.refreshToken()
        .subscribe(response =>{
          this.authService.successfulLogin(response.headers.get("Authorization"));
        }, error => {});
      }else{
        console.log("Não existe login salvo");
      }
      this.navCtrl.setRoot("CategoriasPage");
    }else{
      console.log("Não existe credenciais de login salva");
    }

   
    
  }

  ionViewWillEnter(){
    this.autoLogin();
   this.menu.swipeEnable(false);
  }


  ionViewCanLeave(){
   this.menu.swipeEnable(true);
  }

    login() {
      console.log("fazendo login...");
      this.authService.authenticate(this.credentials)
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        if(response.status == 200){
          this.navCtrl.setRoot("CategoriasPage");
        }
      },error =>{
        console.log(error);
      });
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

}
