import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../service/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public categoriaService: CategoriaService,
    public loadingCtrl: LoadingController) {
  }

  items: Array<ProdutoDTO> = [];
  categoria: CategoriaDTO;
  categorias: Observable<CategoriaDTO[]>;
  categoriaNome: string = "";
  page : number = 0;
  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get("categoria_id");
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
    .subscribe(response => {
      let start = this.items.length;
      this.categorias = this.categoriaService.findAll();
      this.items = this.items.concat(response['content']);
      let end = this.items.length -1;
      this.categorias.forEach(c => {
        c.forEach(ct => {
          if (ct.id == categoria_id) {
            this.categoria = ct;
            this.categoriaNome = this.categoria.nome;
          }
        });
      }).then(() => {
        loader.dismiss();
      });
      this.loadImageUrls(start, end);
    }, error => { console.log("Error ", error); loader.dismiss(); });
  }

  loadImageUrls(start : number, end: number) {
    for (var index = start; index <= end; index++) {
      let item = this.items[index];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.baseUrlBucket}/prod${item.id}-small.jpg`;
      },
        error => { });
    }

  }

  showDetail(produtoId: string) {
    this.navCtrl.push("ProdutoDetailPage", { produto_id: produtoId });
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    loading.present();
    return loading;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
