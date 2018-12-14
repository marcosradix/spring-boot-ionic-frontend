import { API_CONFIG } from './../../config/api.config';
import { CategoriaService } from './../../service/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../model/categoria.dto';


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
    }, error => { });
   
  }

  mostrarProdutos(){
    this.navCtrl.push("ProdutosPage");
  }

}
