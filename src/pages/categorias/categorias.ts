import { API_CONFIG } from './../../config/api.config';
import { CategoriaService } from './../../service/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../model/categoria.dto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public categoriaService: CategoriaService) {
  }

  categorias: Array<CategoriaDTO> =[];
  bucketUrl: string = API_CONFIG.baseUrlBucket;
  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe((resp) =>{
      this.categorias = resp;
      console.log("Categorias",this.categorias);
    }, error => { });
   
  }

}
