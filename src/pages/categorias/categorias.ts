
import { API_CONFIG } from './../../config/api.config';
import { CategoriaService } from './../../service/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CategoriaDTO } from '../../model/categoria.dto';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public loadingCtrl: LoadingController) {
  }

  categorias: Array<CategoriaDTO> = [];
  bucketUrl: string = API_CONFIG.baseUrlBucket;
  ionViewDidLoad() {
    this.loadData();
  }

  mostrarProdutos(categoria_id: string) {
    this.navCtrl.push("ProdutosPage", { categoria_id: categoria_id });
  }
  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    loading.present();
    return loading;
  }

  loadData() {
    let loader = this.presentLoading();
    this.categoriaService.findAll().subscribe((resp) => {
      this.categorias = resp;
      loader.dismiss();
    }, error => { loader.dismiss() });
  }
  doRefresh(refresher) {
    this.categorias = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
