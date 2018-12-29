import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../service/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../model/produto.dto';
import { CategoriaService } from '../../service/domain/categoria.service';
import { CategoriaDTO } from '../../model/categoria.dto';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public categoriaService: CategoriaService) {
  }

  items: Array<ProdutoDTO> = [];
  categoria: CategoriaDTO;
  categorias: Observable<CategoriaDTO[]>;
  categoriaNome: string ="";
  ionViewDidLoad() {
    let categoria_id = this.navParams.get("categoria_id");
    this.produtoService.findByCategoria(categoria_id).subscribe(response => {
      this.categorias = this.categoriaService.findAll();
      this.items = response['content'];
      this.categorias.forEach(c =>{
        c.forEach(ct =>{
          if(ct.id == categoria_id){
            this.categoria = ct;
            this.categoriaNome = this.categoria.nome;
          }
        });
      });
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

  showDetail(produtoId: string){
    this.navCtrl.push("ProdutoDetailPage", {produto_id:produtoId});
  }

}
