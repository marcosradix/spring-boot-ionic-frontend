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
    this.produtoService.findByCategoria(categoria_id).subscribe(response =>{
     this.items =  response['content'];
    },
    error => console.log("Error ",error));
  }

}
