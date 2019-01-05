import { FormGroup, FormBuilder, Validators as valid } from '@angular/forms';
import { PedidoDTO } from './../../model/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBulder: FormBuilder) {
      this.pedido = this.navParams.get("pedido");

      this.formGroup = this.formBulder.group({
        numeroDeParcelas: [1, valid.required],
        "@type": ["pagamentoComCartao", valid.required]
      });
  }

  pedido: PedidoDTO;

  parcelas: Array<number> = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;


  nextPage(){
    this.pedido.pagamneto = this.formGroup.value;
    if(this.pedido.pagamneto["@type"] == "pagamentoComBoleto"){
      this.pedido.pagamneto.numeroDeParcelas = 1;
    }
    console.log(this.pedido);
  }

}
