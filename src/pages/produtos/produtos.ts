import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../service/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../model/produto.dto';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  items: Array<ProdutoDTO> = [];

  ionViewDidLoad() {
    let categoria_id = this.navParams.get("categoria_id");
    this.produtoService.findByCategoria(categoria_id).subscribe(response => {
      this.items = response['content'];
      this.loadImageUrls();
    },
      error => console.log("Error ", error));
  }

  loadImageUrls() {
    for (let index = 0; index < this.items.length; index++) {
      let item = this.items[index];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.baseUrlBucket}/prod${item.id}-small.jpg`;
      },
        error => {});
    }

  }

}
