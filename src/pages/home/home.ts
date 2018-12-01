import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController) {

  }
  src:string=`/assets/imgs/slide1.jpeg`;

  goToSlide() {
    this.slides.slideTo(1, 500);
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if(this.slides.isEnd){
      this.src = `/assets/imgs/slide${1}.jpeg`;
    }
    this.src = `/assets/imgs/slide${currentIndex+1}.jpeg`;
    console.log('Current index is', currentIndex);
  }

}
